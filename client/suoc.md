
            <ThemeProvider>
                <UserProvider>
                    <ItemProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            {/* <Route path="/L" element={<Otp />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/home" element={<HomePage />} >
                            </Route>
                            <Route path="/reset" element={<Password />} />


                            <Route path="/item" element={<ItemMovie />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/itemlove" element={<ItemLove />} />
                            <Route path="/love" element={<LoveMovie />} />
                            <Route path="/ticket" element={<Myticket />} />
                            <Route path="/lmovie" element={<LatestMovie />} />
                            <Route path="/boking" element={<Select />} />
                            <Route path="/pay" element={<Pay />} />
                            <Route path="/qrcode" element={<QrCode />} /> */}

                            {/* <Route path="/profile" element={<HomeFile />} /> */}
                            {/* <Route path="/pay" element={<Pay />} /> */}
                        </Routes>
                    </ItemProvider>
                    <Routes>
                        {/* <Route path="/profile" element={<HomeFile />} >
                            <Route path="privacy" element={<Privacy />} />
                            <Route path="terms" element={<Terms />} />
                            <Route path="rename" element={<UserRename />} />
                            <Route path="change-password" element={<ChangePassWord/>} />
                        </Route> */}
                    </Routes>
                    
                </UserProvider>
            </ThemeProvider>




           
// import Home from './components/Layout/Home/homebaner';
// import Login from './components/Layout/Dasboard/Login';
// import Otp from './components/Layout/Dasboard/OtpLog';
// import SignUp from './components/Layout/Dasboard/SignUp';
// import Password from './components/Layout/Dasboard/ResetPass';
// import HomePage from './components/Layout/Home/Homepage';
// import LatestMovie from './components/Layout/Product/Lastmovie/CardLmovie';
// import ItemMovie from './components/Layout/Product/Lastmovie/itemMovie';
// import Select from './components/Layout/Product/Booking/SelectSeats';
// import Pay from './components/Layout/Product/Booking/PayBooking';
// import HomeFile from './components/Layout/Product/Profile/homeFile';
// import Privacy from './components/Layout/Product/Profile/childRouter/Privacy';
// import Terms from './components/Layout/Product/Profile/childRouter/Terms';
// import Search from './components/Layout/Product/Search';
// import LoveMovie from './components/Layout/Product/LoveMovie';
// import ItemLove from './components/Layout/Product/LoveMovie/ItemLove';
// import Myticket from './components/Layout/Product/Myticket';
// import { ThemeProvider } from './context/Theme/index';
// import { UserProvider } from './hooks/GetApi/GetContext';
// import { ItemProvider } from './hooks/GetApi/ItemContext';
// import QrCode from './components/Layout/Product/Booking/QrCode';
// import UserRename from './components/Layout/Product/Profile/childRouter/UserRename';
// import ChangePassWord from './components/Layout/Product/Profile/childRouter/ChangePass';



QRCode.toDataURL(ticketId)

skip login 

resis


   {dataMovie && isValid ? <div className={` absolute top-20 iphone-12-pro-max:flex w-full flex flex-col min-h-screen  font-movie px-5  ${textClasses} `}>



                <div className='bg-black w-full '>
                    hell



                </div>



                <div className='flex flex-row md:flex-row '>
                    {/* <div className='w-full md:w-full '>
                        <img
                            src={dataMovie.poster}
                            alt="helo"
                            className='rounded-2xl w-full  h-[300px] sm:h-[400px] md:h-[600px] object-cover'
                        />
                    </div> */}

                    <div className='flex flex-col justify-between px-5 sm:px-10 text-center md:text-center'>
                        {/* Genre Section */}
                        <div className='flex flex-col items-center '>
                            <AiOutlineVideoCamera className='text-primary-textMovie' size={35} />
                            <span className='text-gray-400'>Type</span>
                            <p className='font-logo'>{dataMovie.genres[0]}</p>
                        </div>

                        {/* Duration Section */}
                        <div className='flex flex-col items-center '>
                            <div><IoMdTime className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Duration</span>
                            <p className='font-logo text-sm'>{convertMinutesToHhMm(dataMovie.runtime)}</p>
                        </div>

                        {/* Rating Section */}
                        <div className='flex flex-col items-center '>
                            <div><CiStar className='text-primary-textMovie' size={35} /></div>
                            <span className='text-gray-400'>Rating</span>
                            <p className='font-logo'>{Number(dataMovie.imdb.rating).toFixed(1)}/10</p>
                        </div>
                    </div>
                </div>

                <div className='my-5 flex justify-between items-center'>
                    <div>
                        <h2 className='font-w900'>{dataMovie.title}</h2>
                        <p className='text-gray-400 mt-2'>{dataMovie.theFirm}</p>
                    </div>
                    <div>
                        {IsTrue
                            ? <div
                                onClick={handleRemoveLove}
                                className={`flex w-[200px] p-4 items-center gap-2 ${buttonCLick} cursor-pointer`} >
                                <span><FaHeart size={30} /></span>
                                <p>Remove List</p>
                            </div>
                            : <div
                                onClick={handleAddLove}
                                className={`flex w-[200px] p-4 items-center gap-5 ${buttonCLick} cursor-pointer`}>
                                <span><FaRegHeart size={30} /></span>
                                <p>Add List</p>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <h2 className='font-w900'>Descriptions</h2>
                    <p>{dataMovie.fullplot}</p>
                    {/* <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum eos error consectetur repellendus! Aspernatur numquam non reiciendis sit nesciunt consequatur, perferendis a ratione dolor, earum quia nobis aliquid. Blanditiis.</p> */}
                </div>
                <div className=''>
                    <Link className='text-white hover:text-white' to={`booking`} state={dataMovie} onClick={() => handleClick(data)}>
                        <Button className={`${btnSubmit} hover:bg-chairMovie-chairSelected  h-16 mt-10 text-xl w-full `}>Select Seat</Button>
                    </Link>

                </div>

            </div> : ''}