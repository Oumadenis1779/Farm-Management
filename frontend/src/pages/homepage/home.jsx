// src/pages/Home.js
import React from 'react';
import Header from './homenav';
import { Link } from 'react-router-dom';
import HomeFooter from './homefooter';
import './home.css'

function Home() {
    return (
        <div className="">
            <Header />
            <div className='container mx-auto'>

                <div className="row m-5 text-center gy-4 justify-content-center">
                    <div className='col-12 header-container' >
                        <h1 className="header">"Streamline your farm operations with our intuitive management application."</h1>
                    </div>
                    <div className='col-12'>
                        <p>Track all your farm activities with the farm managing software offered by the farm tracker aplication to help you streamline operattions in the farm</p>
                    </div>
                    <div className='col-12 link'>
                        {/* Linking to the login page */}
                        <button type="button" className="btn btn-success ">
                            <Link to="/login" className="text-white">Get started</Link>
                        </button>
                    </div>
                    <div className='col-12 w-75 image-container' >
                        <img src="https://www.futurefarming.com/app/uploads/2022/03/IMG_farmerafrica-848x565.jpg" class="img-fluid rounded-2 width: 100%" alt="farm hero" />
                    </div>
                </div>

                <div className="card border-0 my-5 " style={{ maxWidth: '100%' }}>
                    <div class="row g-4 ">
                        <div class="col-md-4">
                            <img src="https://i.ibb.co/nLkMVB9/Screenshot-from-2024-02-21-20-46-07.png" class="img-fluid rounded-5 " alt='' />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body ">
                                <h5 class="card-title">Get it done smart and efficiently</h5>
                                <p class="card-text">Farm work & task management features help you organize and assign tasks from anywhere (even offline) so your farmhands can see what they need to do, farm task priorities and when work is due. Make it easy to focus on what’s important and track what needs to get done.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-0 my-5" style={{ maxWidth: '100%' }}>
                    <div class="row g-4">
                        <div class="col-md-8">
                            <div class="card-body ">
                                <h5 class="card-title">Data is key in finance </h5>
                                <p class="card-text">Integrated farm accounting and bookkeeping features purpose built for farms. Simplify financial reporting, cashflow analysis and make tax time a breeze.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <img src="https://ak.picdn.net/shutterstock/photos/2156703585/watermark_1000/e356354f31e050c00f087d168a788752/preview_1000-2156703585.jpg" class="img-fluid rounded-5 w-full shadow-lg" alt="..." />
                        </div>
                    </div>
                </div>

                <div className="card border-0 my-5 " style={{ maxWidth: '100%' }}>
                    <div class="row g-4 ">
                        <div class="col-md-4">
                            <img src="https://i.pinimg.com/564x/08/8f/bf/088fbfdee6277041fe45a012afa86dcf.jpg" class="img-fluid rounded-5 " alt='' />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body ">
                                <h5 class="card-title">Optimize Your Farm's Efficiency</h5>
                                <p class="card-text">"Farm Tracker is your all-in-one solution for managing tasks, tracking inventory, and monitoring weather conditions. Streamline your farm operations and boost productivity today!"</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='my-5 gy-4 row justify-content-center'>
                    <div className='row text-center'>
                        <h1>How our application looks like</h1>
                    </div>
                    <div id="carouselExample" class="carousel slide w-50 col-12">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://i.ibb.co/Lkmgndc/Screenshot-from-2024-02-21-20-07-31.png" alt="" />
                            </div>
                            <div class="carousel-item">
                                <img src="https://i.ibb.co/Cb8pBj4/Screenshot-from-2024-02-21-20-07-16.png" alt="" />
                            </div>
                            <div class="carousel-item">
                                <img src="https://i.ibb.co/SXhpSMM/Screenshot-from-2024-02-21-20-06-56.png" alt="" />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className='col-12 text-center'> {/* Use 'text-center' class to center the button */}
                        <div className='btn-container'> {/* Assuming 'btn-container' has other styles */}
                            <button type="button" className="btn btn-success link">
                                <Link to="/login" className="text-white link">Get started</Link>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row text-center'>
                    <h1>Trusted By Many</h1>
                </div>
                <section>
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-10 col-xl-8 text-center">
                            <p class="mb-4 pb-2 mb-md-5 pb-md-0">
                                "Join the growing community of farmers and agriculturalists who rely on Farm Tracker to streamline their operations, optimize efficiency, and make informed decisions. Experience the difference today!"
                            </p>
                        </div>
                    </div>

                    <div class="row text-center">
                        <div class="col-md-4 mb-5 mb-md-0">
                            <div class="d-flex justify-content-center mb-4">
                                <img src="https://i.pinimg.com/564x/c6/f6/7e/c6f67e3b08a4605810f7ae72373e3d2b.jpg "
                                    class="rounded-circle shadow-1-strong" width="150" height="150" alt='' />
                            </div>
                            <h5 class="mb-3">Maria Smantha</h5>
                            <h6 class="text-success mb-3">Organic Farmer</h6>
                            <p class="px-xl-3">
                                <i class="fas fa-quote-left pe-2"></i>"Farm Tracker revolutionized the way we manage our farm! With its intuitive interface and powerful features, we're able to streamline our operations and increase productivity. Highly recommended!"
                            </p>
                            <ul class="list-unstyled d-flex justify-content-center mb-0">
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star-half-alt fa-sm text-warning"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-4 mb-5 mb-md-0">
                            <div class="d-flex justify-content-center mb-4">
                                <img src="https://i.pinimg.com/564x/c5/b4/0e/c5b40e15cc602389d620d02bdd55bd48.jpg"
                                    class="rounded-circle shadow-1-strong" width="150" height="150" alt='' />
                            </div>
                            <h5 class="mb-3">Lisa Cudrow</h5>
                            <h6 class="text-success mb-3">Livestock Farmer</h6>
                            <p class="px-xl-3">
                                <i class="fas fa-quote-left pe-2">"As a small-scale farmer, I struggled to keep track of tasks and inventory. Thanks to Farm Tracker, I now have everything I need in one place. It's user-friendly and has made a huge difference in how efficiently I run my farm."</i>
                            </p>
                            <ul class="list-unstyled d-flex justify-content-center mb-0">
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-4 mb-0">
                            <div class="d-flex justify-content-center mb-4">
                                <img src="https://i.pinimg.com/564x/10/2a/7c/102a7ca04eb49410426895c355c227cf.jpg"
                                    class="rounded-circle shadow-1-strong" width="150" height="150" alt='' />
                            </div>
                            <h5 class="mb-3">Didas Mb</h5>
                            <h6 class="text-success mb-3">Vegetable Farmer</h6>
                            <p class="px-xl-3">
                                <i class="fas fa-quote-left pe-2"></i>"Farm Tracker has been a game-changer for our large-scale farm operation. The ability to manage inventory, assign tasks, and track weather conditions all in one platform has saved us time and improved our decision-making process. We couldn't be happier with the results!"
                            </p>
                            <ul class="list-unstyled d-flex justify-content-center mb-0">
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="fas fa-star fa-sm text-warning"></i>
                                </li>
                                <li>
                                    <i class="far fa-star fa-sm text-warning"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <HomeFooter />
        </div>

    );
}

export default Home;
