"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const axios = require("axios");
const Stream = require("stream");

async function* chunksToLines(chunksAsync) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    const bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    previous += bufferChunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex + 1).trimEnd();
      if (line === "data: [DONE]") break;
      if (line.startsWith("data: ")) yield line;
      previous = previous.slice(eolIndex + 1);
    }
  }
}

async function* linesToMessages(linesAsync) {
  for await (const line of linesAsync) {
    const message = line.substring("data :".length);

    yield message;
  }
}

async function* streamCompletion(data) {
  yield* linesToMessages(chunksToLines(data));
}

const init = async () => {
  const port = process.env.PORT || 3010;
  const host = process.env.PORT ? "0.0.0.0" : "localhost";
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: true,
    },
  });

  server.route({
    method: "POST",
    path: `/ai/run`,
    handler: async (req, h) => {
      class ResponseStream extends Stream.PassThrough {
        setCompressor(compressor) {
          this._compressor = compressor;
        }
      }

      let stream = new ResponseStream();

      const somethingWentWrong = () => {
        stream.write("Something went wrong");
        stream.end();

        return h.response(stream).type("text/event-stream");
      };

      try {
        const {
          payload: { logs }
        } = req;

        stream.on("error", (err) => {
          console.error("passThrough encountered an error:", err);
        });

        if (process.env.IS_AVAILABLE === "true") {
          const config = {
            method: "post",
            url: "https://api.openai.com/v1/chat/completions",
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              model: "gpt-4-1106-preview",
              messages: [
                {
                  role: "system",
                  content: `You are a license plate fuzzy matching CLI, you maintain a cache of license plates that will be used to assist users in finding their plate without leaking data.

                  Your cache ultimately comes from an LPR camera which captures what it can see, sometimes the camera gets it wrong and fails to capture all of the plate, usually it adds or removes a character from the start and end of the plate.    
                  
                  You support the following commands:
                  
                  - add-plate {PLATE} // adds a license plate to cache, example output: Plate {PLATE} has been added to the cache.
                  - remove-plate {PLATE} // removes a license plate from cache, example output: Plate {PLATE} has been removed from the cache.
                  - find-matches {PLATE} // finds the closest matches to a plate given the PLATE_MATCHING_CONSTRAINTS and only shows plates from the cache, example output: Found the following matches for {PLATE}:, if no matches found then: No matches found.
                  - show-plates // shows a list of plates stored in cache, example output: All cached plates:
                  
                  PLATE_MATCHING_CONSTRAINTS
                  - The start character might be missing from the input and/or the cache
                  - The end character might be missing from the input and/or the cache
                  - An additional character might be added to the beginning of the input and/or cache
                  - An additional character might be added to the end of the input and/or cache
                  - Prioritise exact matches and disregard the rest
                  - EXCLUDE matches if the user only supplied the begining of the plate
                  - EXCLUDE matches if the user only supplied the end of the plate
                  - INCLUDE matches if the user supplies most of the middle of the plate
                  - Because we're dealing with data from the real world, some characters can be mistaken of others, here's a mapping of likely scenarios in the following format of [character]: [characters they can be mistaken for].
                  
                  let mapping = {0: ["0", "D", "O", "Q"],1: ["1", "I"],2: ["2", "Z"],3: ["3", "8", "B"],4: ["4", "A"],5: ["5", "S"],8: ["3", "8", "B"],A: ["4", "A"],B: ["3", "8", "B"],D: ["0", "D", "O", "Q"],E: ["E", "F"],F: ["E", "F", "P"],H: ["H", "K", "M", "R"],I: ["1", "I"],K: ["H", "K", "R"],M: ["H", "K", "M"],O: ["0", "D", "O", "Q"],P: ["F", "P"],Q: ["0", "D", "O", "Q"],R: ["H", "K", "R"],S: ["5", "S"],T: ["T", "Y"],V: ["V", "Y"],Y: ["V", "T", "Y"],Z: ["2", "Z"]};
                  
                  The cache currently has the following values: ["MRZ", "PARKAT", "YYKK", "TES893", "JFJ389"]
                  
                  A user will start by issuing a command, you will only respond with the CLI output, that's ALL.
                  `,
                },
                ...logs
              ],
              temperature: 0.7,
              stream: true,
            }),
            responseType: "stream",
          };

          const completion = await axios(config);

          try {
            setTimeout(() => {
              (async function () {
                let all = "";
                for await (const message of streamCompletion(completion.data)) {
                  const parsed = JSON.parse(message);
                  const { delta } = parsed.choices[0];

                  const { content: text } = delta;

                  all += text || "";

                  stream.write(text || "");
                  stream._compressor.flush();
                }

                stream.end();
              })();
            }, 0);
          } catch (error) {
            console.log(error);
            return somethingWentWrong();
          }
        } else {
          stream.write(
            "Sorry, I can't help right now. This service has been turned off.\n"
          );
        }

        return h.response(stream).type("text/event-stream");
      } catch (error) {
        console.log(error);
        return somethingWentWrong();
      }
    },
  });

  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

init();
