import Link from 'next/link';
import React from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';

const LatestSales = () => {
    return (
        <React.Fragment>
            <Col xxl={4}>
                <Card className="card-height-100">
                    <Card.Header className="d-flex">
                        <h5 className="card-title flex-grow-1 mb-0">Latest Sales</h5>
                        <div className="flex-shrink-0">
                            <Dropdown drop="start">
                                <Dropdown.Toggle as="a" className="arrow-none">
                                    <i className="ri-more-2-fill fs-14"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu as="ul" className="dropdown-menu-end">
                                    <li> <Dropdown.Item href="#">View</Dropdown.Item> </li>
                                    <li> <Dropdown.Item href="#">Edit</Dropdown.Item> </li>
                                    <li> <Dropdown.Item href="#">Delete</Dropdown.Item> </li>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless align-middle mb-0">
                                <thead className="table-active">
                                    <tr>
                                        <th scope="col">Email<i className="ri-arrow-up-down-line align-middle ms-2"></i></th>
                                        <th scope="col">Price<i className="ri-arrow-up-down-line align-middle ms-2"></i></th>
                                        <th scope="col">Tag<i className="ri-arrow-up-down-line align-middle ms-2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>jordan.martino@hybrix.com</td>
                                        <td>$1.95</td>
                                        <td><Link href="#" scroll={false} className="badge text-success  bg-success-subtle">Paid</Link></td>
                                    </tr>
                                    <tr>
                                        <td>nancy.martino@hybrix.com</td>
                                        <td>$5.00</td>
                                        <td><Link href="#" scroll={false} className="badge text-warning bg-warning-subtle">Pending</Link></td>
                                    </tr>
                                    <tr>
                                        <td>pieter.novitsky@hybrix.com</td>
                                        <td>$2.05</td>
                                        <td><Link href="#" scroll={false} className="badge text-success  bg-success-subtle">Paid</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Ashley@hybrix.com</td>
                                        <td>$69.99</td>
                                        <td><Link href="#" scroll={false} className="badge text-danger  bg-danger-subtle">Cancelled</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Heather@hybrix.com</td>
                                        <td>$16.78</td>
                                        <td><Link href="#" scroll={false} className="badge text-danger  bg-danger-subtle">Cancelled</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Jimenez@hybrix.com</td>
                                        <td>$79.99</td>
                                        <td><Link href="#" scroll={false} className="badge text-success  bg-success-subtle">Paid</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Daniel@hybrix.com</td>
                                        <td>$87.00</td>
                                        <td><Link href="#" scroll={false} className="badge text-warning bg-warning-subtle">Pending</Link></td>
                                    </tr>
                                    <tr>
                                        <td>Scott@hybrix.com</td>
                                        <td>$42.32</td>
                                        <td><Link href="#" scroll={false} className="badge text-danger  bg-danger-subtle">Cancelled</Link></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <ul className="pagination pagination-separated mb-0 mt-4 pt-1 justify-content-end">
                            <li className="page-item disabled">
                                <Link href="#" scroll={false} className="page-link">Previous</Link>
                            </li>
                            <li className="page-item active">
                                <Link href="#" scroll={false} className="page-link">1</Link>
                            </li>
                            <li className="page-item ">
                                <Link href="#" scroll={false} className="page-link">2</Link>
                            </li>
                            <li className="page-item">
                                <Link href="#" scroll={false} className="page-link">3</Link>
                            </li>
                            <li className="page-item">
                                <Link href="#" scroll={false} className="page-link">Next</Link>
                            </li>
                        </ul>
                    </Card.Body>
                </Card>
            </Col>
        </React.Fragment >
    );
}

export default LatestSales;