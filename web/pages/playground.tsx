import React, { ReactElement, useState } from "react";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "@common/Layout";

//imoprt Components
import Widget from "@component/Dashboard/Widget";
import Revenue from "@component/Dashboard/Revenue";
import MoreSales from "@component/Dashboard/MoreSales";
import RecentOrders from "@component/Dashboard/RecentOrders";
import RecentChat from "@component/Dashboard/RecentChat";
import BestSellingProducts from "@component/Dashboard/BestSellingProducts";
import ProductDelivery from "@component/Dashboard/ProductDelivery";
import SalesByCategory from "@component/Dashboard/SalesByCategory";
import StockReport from "@component/Dashboard/StockReport";
import TopRetailSalesLocation from "@component/Dashboard/TopRetailSalesLocation";

const Dashboard = () => {
  const [plate, setPlate] = useState("");
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState<any>([]);
  const runCommand = async (command: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const appended = [
      ...logs,
      {
        role: "user",
        content: command === "show-plates" ? command : `${command} ${plate}`,
      },
    ];

    const raw = JSON.stringify({
      logs: appended,
    });

    const response = await fetch(`https://quickreads-6ec74182c543.herokuapp.com/ai/run`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    });

    const reader = response?.body
      ?.pipeThrough(new TextDecoderStream())
      .getReader();

    if (!reader) {
      return;
    }

    let currentValue = "";
    while (true) {
      let { value, done } = await reader.read();
      if (done) break;
      currentValue += value;
      setOutput(`${currentValue}\n`);
    }

    setLogs([...appended, { role: "assistant", content: currentValue }]);
  };
  return (
    <React.Fragment>
      <Head>
        <title>quickREADS - Playground</title>
      </Head>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <MoreSales />
                  <div className="row">
                    <div className="col">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Playground</h4>
                        </div>
                        <div className="card-body">
                          <div className="gy-4 row">
                            <div className="col-xxl-3 col-md-6">
                              <div>
                                <label className="form-label">Plate</label>
                                <input
                                  type="text"
                                  id="plate"
                                  className="form-control"
                                  value={plate}
                                  onChange={(event) => {
                                    setPlate(
                                      event.target.value
                                        .toUpperCase()
                                        .replace(/[^A-Z0-9]/g, "")
                                        .slice(0, 9)
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap gap-2 mt-4">
                            <button
                              type="button"
                              className="rounded-pill btn btn-primary"
                              onClick={() => runCommand("find-matches")}
                            >
                              Find Matches
                            </button>
                            <button
                              type="button"
                              className="rounded-pill btn btn-secondary"
                              onClick={() => runCommand("add-plate")}
                            >
                              Add Plate
                            </button>
                            <button
                              type="button"
                              className="rounded-pill btn btn-success"
                              onClick={() => runCommand("show-plates")}
                            >
                              Show Plates
                            </button>
                            <button
                              type="button"
                              className="rounded-pill btn btn-danger"
                              onClick={() => runCommand("remove-plate")}
                            >
                              Remove Plate
                            </button>
                          </div>
                        </div>
                        <div className="bg-light border-bottom border-top bg-opacity-25 card-body">
                          <h5 className="fs-12 text-muted mb-0">Quick Logs</h5>
                        </div>
                        <div className="card-body">
                          <pre
                            className="language-markup"
                            style={{ height: "450px" }}
                          >
                            <pre
                              className="line-numbers language-html"
                              tabIndex={0}
                            >
                              {output}
                            </pre>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
