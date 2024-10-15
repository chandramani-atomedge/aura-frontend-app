"use client";
import { getDictionary } from "@/getDictionary";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import React from "react";
import withAuth from "@/app/utils/withAuth";
import Image from "next/image";
import dashboard from "@/assets/img/dashboard-timeline-1.svg";
import user3 from "@/assets/img/user-3.png";
import user2 from "@/assets/img/user-2.png";
import user1 from "@/assets/img/user-1.png";
import timeline from "@/assets/img/dashboard-timeline-2.svg";
import Apexchart from "@/components/Apexchart";
const Home = ({ params }) => {
  return (
    <main id="main" class="main" style={{ fontFamily: "Poppins ,sans-serif" }}>
      <div class="row">
        <div class="col-lg-12">
          <div class="card info-card sales-card">
            <div class="d-xl-flex d-md-block justify-content-between align-items-center">
              <div class="pagetitle">
                <h1>Welcome John, Have a great morning!</h1>
                <label class="text-desc">Monday, July 29, 2024 </label>
              </div>
              <div class="checkin-date-section">
                <div class="d-flex gap-3">
                  <div class="checkin-date-box">
                    <p class="checkin-value">00</p>
                  </div>
                  <div class="checkin-date-box">
                    <p class="checkin-value">00</p>
                  </div>
                  <div class="checkin-date-box">
                    <p class="checkin-value">00</p>
                  </div>
                </div>
                <button type="button" class="btn btn-outline-success w-100">
                  <i class="bi bi-box-arrow-right pr-10"></i>
                  Check-in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="quick-menu-container">
          <div class="quick-menu">
            <div class="quick-menu-title">
              <p class="text-desc">Quick Links</p>
            </div>
            <ul class="quick-menu-list">
              <li>
                <a href="#">
                  <i class="bi bi-calendar3 mr-10"></i> Attendance & Time
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bi bi-calendar2-check mr-10"></i> Leave Management
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bi bi-cash-coin mr-10"></i> Payroll Management
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bi bi-graph-up-arrow mr-10"></i> Performance
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bi bi-card-checklist mr-10"></i> Recruitment Process
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section class="section dashboard">
        <div class="row">
          <div class="col-lg-5 width-45">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body" style={{ height: "660.9px" }}>
                    <div class="d-lg-flex d-md-block align-items-center justify-content-between">
                      <h5 class="card-title">My Leaves</h5>
                      <div class="action">
                        <button class="btn btn-primary" type="submit">
                          <i class="bi bi-plus-circle mr-10"></i> Apply Leave
                        </button>
                      </div>
                    </div>
                    <hr class="line-separator" />

                    <div class="chart-group">
                      <div id="reportsChart"></div>

                      <Apexchart />

                      <div class="chart-datas">
                        <div class="chart-inner-value">
                          <div class="progress-value">
                            <p>
                              30/<span>70</span>
                            </p>
                          </div>
                          <p class="inner-progress-text">Available</p>
                        </div>
                        <div class="chart-data-progress">
                          <div class="progress-title">
                            <p>Paid Leave</p>
                          </div>
                          <div class="progress-indicater">
                            <div class="progress-stacked">
                              <div
                                class="progress"
                                role="progressbar"
                                aria-label="Segment one"
                                aria-valuenow="70"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "70%" }}
                              >
                                <div class="progress-bar segment-one"></div>
                              </div>
                              <div
                                class="progress"
                                role="progressbar"
                                aria-label="Segment two"
                                aria-valuenow="30"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "30%" }}
                              >
                                <div class="progress-bar segment-two"></div>
                              </div>
                            </div>
                          </div>
                          <div class="progress-value">
                            <p>
                              30/<span>70</span>
                            </p>
                          </div>
                        </div>
                        <div class="chart-data-progress">
                          <div class="progress-title">
                            <p>Casual Leave</p>
                          </div>
                          <div class="progress-indicater">
                            <div class="progress-stacked">
                              <div
                                class="progress"
                                role="progressbar"
                                aria-label="Segment one"
                                aria-valuenow="30"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "30%" }}
                              >
                                <div class="progress-bar segment-one"></div>
                              </div>
                              <div
                                class="progress"
                                role="progressbar"
                                aria-label="Segment two"
                                aria-valuenow="70"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "70%" }}
                              >
                                <div class="progress-bar segment-two"></div>
                              </div>
                            </div>
                          </div>
                          <div class="progress-value">
                            <p>
                              70/<span>30</span>
                            </p>
                          </div>
                        </div>
                        <div class="chart-data-progress">
                          <div class="progress-title">
                            <p>Sick Leave</p>
                          </div>
                          <div class="progress-indicater">
                            <div class="progress-stacked">
                              <div
                                class="progress"
                                role="progressbar"
                                aria-label="Segment one"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "50%" }}
                              >
                                <div class="progress-bar segment-one"></div>
                              </div>
                              <div
                                class="progress"
                                role="progressbar"
                                aria-label="Segment two"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "50%" }}
                              >
                                <div class="progress-bar segment-two"></div>
                              </div>
                            </div>
                          </div>
                          <div class="progress-value">
                            <p>
                              50/<span>50</span>
                            </p>
                          </div>
                        </div>
                        <div class="chart-bar-labels">
                          <div class="label-item">
                            <div class="label-circle primary"></div>
                            <p>Allotted Leaves</p>
                          </div>
                          <div class="label-item">
                            <div class="label-circle secondary"></div>
                            <p>Available Leaves</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="recent-activity-section pt-30">
                      <div class="card-bo">
                        <div class="d-lg-flex d-md-block align-items-center justify-content-between pb-10">
                          <h5 class="card-title">Applied Leaves</h5>
                          <div class="action">
                            <a class="icon" href="#">
                              See all
                            </a>
                          </div>
                        </div>
                        <div class="activity">
                          <div class="activity-item d-lg-flex d-md-block">
                            <div class="activite-label"></div>
                            <i class="bi bi-circle-fill activity-badge align-self-start"></i>
                            <div class="activity-content">
                              <a href="#" class="text-dark">
                                20 September 2024 - 23 September 2024
                              </a>
                              <br />
                              <span class="activity-label">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </span>
                            </div>
                            <div class="activity-action">
                              <button type="button" class="btn btn-success">
                                Approved
                              </button>
                            </div>
                          </div>
                          <div class="activity-item d-lg-flex d-md-block">
                            <div class="activite-label"></div>
                            <i class="bi bi-circle-fill activity-badge align-self-start"></i>
                            <div class="activity-content">
                              <a href="#" class="text-dark">
                                20 September 2024 - 23 September 2024
                              </a>
                              <br />
                              <span class="activity-label">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </span>
                            </div>
                            <div class="activity-action">
                              <button type="button" class="btn btn-warning">
                                Pending
                              </button>
                            </div>
                          </div>
                          <div class="activity-item d-lg-flex d-md-block">
                            <div class="activite-label"></div>
                            <i class="bi bi-circle-fill activity-badge align-self-start"></i>
                            <div class="activity-content">
                              <a href="#" class="text-dark">
                                20 September 2024 - 23 September 2024
                              </a>
                              <br />
                              <span class="activity-label">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                              </span>
                            </div>
                            <div class="activity-action">
                              <button type="button" class="btn btn-success">
                                Approved
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-7 width-55">
            <div class="card">
              <div class="card-body">
                <div class="d-lg-flex d-md-block align-items-center justify-content-between pb-10">
                  <h5 class="card-title">Daily Activity</h5>
                  <div class="action">
                    <a
                      class="icon pr-20"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#RegularizeModal"
                    >
                      Regularize
                    </a>
                    <a class="icon" href="#">
                      Filter
                    </a>
                  </div>
                </div>
                <div class="timelime-chart">
                  <div class="rectangle-parent">
                    <Image
                      class="group-item"
                      alt="dashboard-timeline"
                      src={dashboard}
                    />
                    <Image
                      class="group-inner"
                      alt="dashboard-timeline"
                      src={dashboard}
                    />
                    <Image
                      class="vector-icon"
                      alt="dashboard-timeline"
                      src={dashboard}
                    />
                    <Image
                      class="group-child1"
                      alt="dashboard-timeline"
                      src={dashboard}
                    />
                    <div class="am">9.00 am</div>
                    <div class="am1">10.00 am</div>
                    <div class="am2">11.00 am</div>
                    <div class="pm">12.00 pm</div>
                    <div class="pm1">1.00 pm</div>
                    <div class="pm2">2.00 pm</div>
                    <div class="pm3">3.00 pm</div>
                    <div class="pm4">4.00 pm</div>
                    <div class="pm5">5.00 pm</div>
                    <div class="pm6">6.00 pm</div>
                    <div class="div">01-08-24</div>
                    <div class="div1">01-08-24</div>
                    <div class="div2">01-08-24</div>
                    <div class="rectangle-div"></div>
                    <div class="group-child2"></div>
                    <div class="group-child3"></div>
                    <div class="group-child4"></div>
                    <div class="in">In</div>
                    <div class="in1">In</div>
                    <div class="in2">In</div>
                    <div class="in3">In</div>
                    <div class="out">Out</div>
                    <div class="out1">Out</div>
                    <div class="out2">Out</div>
                    <div class="am3">11.30 am</div>
                    <div class="am4">11.30 am</div>
                    <div class="am5">11.30 am</div>
                    <div class="am6">11.30 am</div>
                    <div class="pm7">5.00 pm</div>
                    <div class="pm8">5.00 pm</div>
                    <div class="pm9">5.00 pm</div>
                    <div class="group-child5"></div>
                    <div class="group-child6"></div>
                    <div class="group-child7"></div>
                    <div class="group-child8"></div>
                    <div class="group-child9"></div>
                    <div class="group-child10"></div>
                    <div class="group-child11"></div>
                    <Image
                      class="group-child12"
                      alt="dashboard-timeline"
                      src={timeline}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="card">
                  <div class="card-body pb-0">
                    <div class="d-lg-flex d-md-block align-items-center justify-content-between pb-10">
                      <h5 class="card-title">Upcoming Holidays</h5>
                      <div class="action">
                        <a class="icon" href="#">
                          See all
                        </a>
                      </div>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <h4 class="events-name">
                          <a href="#">Deepavali</a>
                        </h4>
                        <p class="events-type">General / Restricted</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <h4 class="events-name">
                          <a href="#">Dussehra</a>
                        </h4>
                        <p class="events-type">General / Restricted</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <h4 class="events-name">
                          <a href="#">Christmas</a>
                        </h4>
                        <p class="events-type">General / Restricted</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <h4 class="events-name">
                          <a href="#">New Year</a>
                        </h4>
                        <p class="events-type">General / Restricted</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="card">
                  <div class="card-body pb-0">
                    <div class="d-lg-flex d-md-block align-items-center justify-content-between pb-10">
                      <h5 class="card-title">Upcoming Birthdays</h5>
                      <div class="action">
                        <a class="icon" href="#">
                          See all
                        </a>
                      </div>
                    </div>
                    <div class="search-container">
                      <input
                        type="text"
                        class="search-input"
                        placeholder="Search Employee"
                      />
                      <button class="search-button">
                        <i class="bi bi-search"></i>
                      </button>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <Image src={user1} alt="user" />
                        <h4>
                          <a href="#">John Doe</a>
                        </h4>
                        <p>Software Developer</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <Image src={user2} alt="user" />
                        <h4>
                          <a href="#">Sara Wood</a>
                        </h4>
                        <p>Software Developer</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                    <div class="news">
                      <div class="post-item clearfix">
                        <Image src={user3} alt="user" />
                        <h4>
                          <a href="#">Jessie Marshall</a>
                        </h4>
                        <p>UI/UX Designer</p>
                      </div>
                      <div class="post-item date">
                        <span>1 Nov, 2024</span>
                        <p class="day">Friday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default withAuth(Home);
