function navbar(){
    return( `<div class="navbar">
            <header>
                <nav>
                    <div class="nav_div_1" id="nav_logo_home" style="cursor: pointer;">
                        <img class="logo" src="./imgs/logo.png" alt="Logo">
                        <h1>Bhai <br> Briyani</h1>
                    </div>
                    <div class="nav_div_2">
                        <h4>Location</h4>
                        <div><i style="font-size:18px;color:rgb(97, 97, 97)" class="fa">&#xf017;</i>
                            Order Now <a href="#" onclick="event.preventDefault();"> <i class="fa-solid fa-angle-down"
                                    style="color:rgb(97, 97, 97)"></i></a>
                        </div>
                    </div>
                    <div class="nav_div_3">
                        <p><i style="font-size:24px" class="fa">&#xf0d1;</i> Delivery</p>
                    </div>
                    <div class="nav_div_4">
                        <button class="outlet">Outlets</button>
                        <button class="menu">Menu</button>
                        <button class="table_book">Book a Table</button>
                        <button class="cart_btn_navbar" style="background-color: #FFA608; border-radius: 20px; padding: 5px 15px; color: white; display: flex; align-items: center; gap: 5px; font-weight: bold; border: none; cursor: pointer;">
                            <i class="fa fa-shopping-cart"></i> Cart (<span id="cart_count_badge">0</span>)
                        </button>
                    </div>
                    <div class="nav_div_5">
                        <a id="user_name_show" href="#"><button><i class="material-icons">&#xe7fd;</i> Login</button></a>
                    </div>
                </nav>
             </header>
        </div>`)
        
}export default navbar;

function footer(){
    return(`<div class="footer_div">

        <div class="footer_box_1">
            <div id="footer_img">
                <img src="./imgs/logo.png" alt="">
                <h2>Bhai <br> Briyani</h2>
            </div>
            <div>
                <p>Authentic flavors, rich spices, and the best biryani in town! Experience the taste of tradition with every bite.</p>
            </div>
            <div class="fa_div">
        
                <i class="fa-brands fa-instagram" style="color: #880203;"></i> Instagram <br>
                <i class="fa-brands fa-facebook" style="color: #880205;"></i> Facebook <br>
                <i class="fa-brands fa-youtube" style="color: #880205;"></i> Youtube
        
            </div>
        </div>
        
        
        
        <div class="footer_box_2">
            <div>
                <h3>About</h3>
                <p>About Us</p>
                <p>Our Specialities</p>
                <p>News</p>
                <p>Menu</p>
            </div>
        </div>
        
        <div class="footer_box_3">
            <div>
                <h3>Company</h3>
                <p>Accessibility</p>
                <p>Partner With Us</p>
                <p>FAQ</p>
                <p>Blog</p>
            </div>
        </div>
        
        <div class="footer_box_4">
            <div>
                <h3>Support</h3>
                <p>Account</p>
                <p>Support Center</p>
                <p>Feedback</p>
                <p>Contack Us</p>
            </div>
        </div>
        
        <div class="footer_box_5">
            <div>
                <h3>Branches</h3>
                <p>Chennai</p>
                <p>Trichy</p>
                <p>Madhurai</p>
                <p>Coimbatore</p>
            </div>
        </div>
        </div>`)
}

export {footer};