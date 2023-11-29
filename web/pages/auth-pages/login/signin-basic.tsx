import React, { ReactNode, useState } from 'react';
import NonAuthLayout from '@common/Layout/NonAuthLayout';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import Head from 'next/head';

//import images
import logoLightFull from "@assets/images/logo-light-full.png";
import authEffect2 from "@assets/images/effect-pattern/auth-effect-2.png" ;
import authEffect from "@assets/images/effect-pattern/auth-effect.png";
import Link from 'next/link';

const SigninBasic = () => {
    const [passwordtype, setPasswordtype] = useState<boolean>(true)
    return (
        <React.Fragment>
            <Head>
                <title>Sign In | Hybrix - Admin & Dashboard Template</title>
            </Head>
            <section className="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-0">
                                        <Col lg={5}>
                                            <Card className="auth-card bg-primary h-100 border-0 shadow-none p-sm-3 overflow-hidden mb-0">
                                                <Card.Body className="p-4 d-flex justify-content-between flex-column">
                                                    <div className="auth-image mb-3">
                                                        <Image src={logoLightFull} alt="" height="26" />
                                                        <Image src={authEffect2} alt="" className="auth-effect-2" />
                                                        <Image src={authEffect} alt="" className="auth-effect" />
                                                        <Image src={authEffect} alt="" className="auth-effect-3" />
                                                    </div>
            
                                                    <div>
                                                        <h3 className="text-white">Start your journey with us.</h3>
                                                        <p className="text-white-75 fs-15">It brings together your tasks, projects, timelines, files and more</p>
                                                    </div>
                                                    <div className="text-center text-white-75">
                                                        <p className="mb-0">© 
                                                            {new Date().getFullYear()}{" "}
                                                            Hybrix. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                                                        </p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        
                                        <Col lg={7}>
                                            <Card className="mb-0 border-0 shadow-none">
                                                <Card.Body className="px-0 p-sm-5 m-lg-4">
                                                    <div className="text-center mt-2">
                                                        <h5 className="text-primary fs-20">Welcome Back !</h5>
                                                        <p className="text-muted">Sign in to continue to Hybrix.</p>
                                                    </div>
                                                    <div className="p-2 mt-5">
                                                        <form>
                                                    
                                                            <div className="mb-3">
                                                                <label htmlFor="username" className="form-label">Username</label>
                                                                <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                                            </div>
                                                    
                                                            <div className="mb-3">
                                                                <div className="float-end">
                                                                    <Link href="/auth-pages/passwordreset/pass-reset-basic" className="text-muted">Forgot password?</Link>
                                                                </div>
                                                                <label className="form-label" htmlFor="password-input">Password</label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type={passwordtype ? "password" : "text"} className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" />
                                                                    <Button variant='link' className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => setPasswordtype(!passwordtype)}><i className="ri-eye-fill align-middle"></i></Button>
                                                                </div>
                                                            </div>
                                                    
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                                <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                                                            </div>
                                                    
                                                            <div className="mt-4">
                                                                <Button variant='primary' className="w-100" type="submit">Sign In</Button>
                                                            </div>
                                                    
                                                            <div className="mt-4 pt-2 text-center">
                                                                <div className="signin-other-title">
                                                                    <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                                </div>
                                                                <div className="pt-2 hstack gap-2 justify-content-center">
                                                                    <Button variant='soft-primary' type="button" className="btn-icon"><i className="ri-facebook-fill fs-16"></i></Button>
                                                                    <Button variant='soft-danger' type="button" className="btn-icon"><i className="ri-google-fill fs-16"></i></Button>
                                                                    <Button variant='soft-dark' type="button" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>
                                                                    <Button variant='soft-info' type="button" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    
                                                        <div className="text-center mt-5">
                                                            <p className="mb-0">Don't have an account ? <Link href="/auth-pages/singup/signup-basic" className="fw-semibold text-secondary text-decoration-underline"> SignUp</Link> </p>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        
                                    </Row>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        
                    </Row>
                    
                </Container>
            </section>
        </React.Fragment>
    );
}

SigninBasic.getLayout = function getLayout(page: any) {
    return (
      <NonAuthLayout>
        {page}
      </NonAuthLayout>
    )
};

export default SigninBasic;