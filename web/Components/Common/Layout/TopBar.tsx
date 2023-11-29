import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { get } from "lodash";

import flagus from "@assets/images/flags/us.svg";

//i18n
import i18n from "@common/i18n";
import languages from "@common/data/languages";

const TopBar = () => {
    const currentTime: any = useRef(null);
    const [selectedLang, setSelectedLang] = useState<any>("");

    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE");
        setSelectedLang(currentLanguage);
    }, []);

    const changeLanguageAction = (lang: any) => {
        //set language as i18n
        i18n.changeLanguage(lang);
        localStorage.setItem("I18N_LANGUAGE", lang);
        setSelectedLang(lang);
    };

    return (
        <React.Fragment>
            <div className="top-tagbar">
                <div className="w-100">
                    <Row className="justify-content-between align-items-center">
                        <Col xs={6} className="d-none d-lg-block col-md-auto d-none d-lg-block">
                            <div className="d-flex align-items-center justify-content-center gap-3 fs-13 text-white-50">
                                <div>
                                    <i className="bi bi-envelope align-middle me-2"></i> support@quickreads.com
                                </div>
                                <div>
                                    <i className="bi bi-globe align-middle me-2"></i> www.quickreads.com
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TopBar;