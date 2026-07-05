//importing navbar,footer
import navbar,{footer} from './navbar.js';

// Global Cart & Authentication State
let cart = [];
let currentUser = null;

// Display a beautiful, responsive toast notification
function showToast(message) {
    let toast = document.createElement('div');
    toast.style = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #FFA608;
        color: white;
        padding: 12px 24px;
        border-radius: 10px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateY(10px);
        font-family: inherit;
    `;
    toast.innerHTML = `<i class="fa fa-check-circle"></i> ` + message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}

function updateCartBadge() {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.qty;
    });
    const badge = document.getElementById("cart_count_badge");
    if (badge) {
        badge.innerText = totalItems;
    }
}

function updateNavbarForUser() {
    const loginBtnText = document.querySelector("#user_name_show button");
    if (loginBtnText && currentUser) {
        loginBtnText.innerHTML = `<i class="material-icons">&#xe7fd;</i> Hi, ${currentUser}`;
    }
}

//HTML root div call
var page1_content = document.querySelector(".root");

//innerHTML of HTML root div
page1_content.innerHTML=navbar()

//creation JS ROOT DIV
var js_root = document.createElement("div");
js_root.classList.add("js_root")
page1_content.appendChild(js_root);
console.log(page1_content);

// Attach home logo navigation
const logoHomeBtn = document.getElementById("nav_logo_home");
if (logoHomeBtn) {
    logoHomeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        landingpage();
    });
}

// Attach cart navigation
const cartBtn = document.querySelector(".cart_btn_navbar");
if (cartBtn) {
    cartBtn.addEventListener("click", showCartPage);
}

//Login tag to show signup box
const login_button = document.getElementById("user_name_show")
function loginButton(){
    document.querySelector(".js_root").innerHTML=`<form class="form" id="reg_form_element">
            <h1>Register</h1>

            <div class="input_group">
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="enter your name" name="username">
                <div class="error" style="color: red; font-size: 13px; margin-top: 4px;"></div>
            </div>

            <div class="input_group">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="enter your email" name="email">
                <div class="error" style="color: red; font-size: 13px; margin-top: 4px;"></div>
            </div>

            <div class="input_group">
                <label for="phonenumber">Phone number</label>
                <input id="phonenumber" type="text" placeholder="enter your number" name="phonenumber">
                <div class="error" style="color: red; font-size: 13px; margin-top: 4px;"></div>
            </div>
            <button type="submit" id="register_butt">Register</button>
            
        </form>`

        const form = document.querySelector(".form");
        const username = document.querySelector("#username");
        const email = document.querySelector("#email");
        const phonenumber = document.querySelector("#phonenumber");
        
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if (validateInput()) {
                toShowOtpBox();
            }
        })
        
        function validateInput(){
            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const phonenumberValue = phonenumber.value.trim();
            let isValid = true;
        
            //condition for username
            if(usernameValue===''){
                setError(username,'Username is required')
                isValid = false;
            }else{
                setSuccess(username)
            }
        
            //condition for email
            if(emailValue===''){
                setError(email,'Email is required')
                isValid = false;
            }
            else if(!validateEmail(emailValue)){
                setError(email,'Please enter a valid email');
                isValid = false;
            }
            else{
                setSuccess(email)
            }
        
            //condition for phonenumber
            if(phonenumberValue.length<10 || phonenumberValue===''){
                setError(phonenumber,'Please enter a 10 digit phone number')
                isValid = false;
            }else{
                setSuccess(phonenumber)
            }

            return isValid;
        }
        
        //to show error msg
        function setError(element,message){
            const inputGroup = element.parentElement;
            const errorElement = inputGroup.querySelector(".error");
        
            errorElement.innerText=message;
            inputGroup.classList.add("error");
            inputGroup.classList.remove("success");
        }
        
        //to show success msg
        function setSuccess(element){
            const inputGroup = element.parentElement;
            const errorElement = inputGroup.querySelector(".error");
        
            errorElement.innerText='';
            inputGroup.classList.remove("error");
            inputGroup.classList.add("success");
        }
        
        const validateEmail = (email)=>{
            return String(email)
            .toLowerCase()
            .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        }

function toShowOtpBox(){
    const phonenumber_value = document.getElementById("phonenumber").value;
    const registered_username = document.getElementById("username").value;
    
    // Generate a secure 6-digit OTP
    var otp_code = String(Math.floor(Math.random() * 888888) + 111111);
    console.log("Generated OTP Code:", otp_code);

    document.querySelector(".js_root").innerHTML=`<div class="otp_div" style="padding: 30px; text-align: center; max-width: 450px; margin: 10vh auto; background: white; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
            <h1 style="color: black; font-weight: bold; font-size: 24px;">OTP Verification</h1>
            <p style="color: grey; margin: 10px 0;">Please enter the 6-digit verification code sent to:</p>
            <h2 id="phone_number" style="color: #880203; font-weight: bold; margin-bottom: 20px;">+91 ${phonenumber_value}</h2>

            <!-- Visual Testing Banner so users don't need blocking window.alerts in iframe -->
            <div style="background: #FFFCEB; border: 1px dashed #FFA608; border-radius: 10px; padding: 10px; margin-bottom: 20px; font-weight: bold; color: #880203;">
                🔑 Test Verification Code: ${otp_code}
            </div>

            <div class="otp_input_div" style="display: flex; gap: 8px; justify-content: center; margin-bottom: 20px;">
                <input type="text" id="otp_inputs1" class="otp_inputs" inputmode="numeric" maxlength="1" style="width: 45px; height: 45px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #ccc; border-radius: 8px; color: black;" autofocus>
                <input type="text" id="otp_inputs2" class="otp_inputs" inputmode="numeric" maxlength="1" style="width: 45px; height: 45px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #ccc; border-radius: 8px; color: black;">
                <input type="text" id="otp_inputs3" class="otp_inputs" inputmode="numeric" maxlength="1" style="width: 45px; height: 45px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #ccc; border-radius: 8px; color: black;">
                <input type="text" id="otp_inputs4" class="otp_inputs" inputmode="numeric" maxlength="1" style="width: 45px; height: 45px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #ccc; border-radius: 8px; color: black;">
                <input type="text" id="otp_inputs5" class="otp_inputs" inputmode="numeric" maxlength="1" style="width: 45px; height: 45px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #ccc; border-radius: 8px; color: black;">
                <input type="text" id="otp_inputs6" class="otp_inputs" inputmode="numeric" maxlength="1" style="width: 45px; height: 45px; text-align: center; font-size: 18px; font-weight: bold; border: 1px solid #ccc; border-radius: 8px; color: black;">
            </div>
            <button class="otp_but" style="background-color: #FFA608; border: none; padding: 12px 30px; border-radius: 25px; color: white; font-weight: bold; font-size: 16px; cursor: pointer; width: 100%;">Verify and Proceed</button>
        </div>`

    const otpInputs = document.querySelectorAll(".otp_inputs");
    otpInputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            const val = e.target.value;
            if (isNaN(val)) {
                e.target.value = "";
                return;
            }
            if (val !== "") {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            if (key === "backspace" || key === "delete") {
                input.value = "";
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });

    function otpCheck(){
        let entered_otp = "";
        otpInputs.forEach(input => {
            entered_otp += input.value.trim();
        });
    
        if(otp_code === entered_otp){
            currentUser = registered_username;
            updateNavbarForUser();
            showToast(`Welcome, ${currentUser}! Registered successfully.`);
            landingpage();
        }else{
            showToast("Incorrect OTP! Please check the code and try again.");
            otpInputs.forEach(input => { input.value = ""; });
            otpInputs[0].focus();
        }
    }
    
    document.querySelector(".otp_but").addEventListener("click", otpCheck);
}
}
login_button.addEventListener("click",loginButton);


//Landing page
function landingpage(){
    document.querySelector(".js_root").innerHTML=
    `
    <!-- ------------------------- CONTENT DIV 1 ---------------------------- -->
    
    <div class="content_div">
    
    <div class="content_1">
        <div>
            <h1>Royal <br> Briyani Bliss</h1>
        </div>
        <div>
            <p>Savor the rich aroma, bold spices,and melt- <br>
                in-your-mouth goodness of our authentic, <br>
                hndcrafted briyani!</p>
        </div>
        <div class="small_box_div">
            <div class="small_box_div_1"><i class="fa-solid fa-angle-right"></i></div>
            <div class="small_box_div_2">Order Now</div>
            <div class="small_box_div_3">Mutton Briyani</div>
            <div class="small_box_div_4">$15</div>
    
        </div>
    
        <div class="truck_div">
            <div class="truck_1"><i class="fa-solid fa-truck-fast" style="color: #bbbbbb;"></i>
                <span>Freshly <br> made</span>
            </div>
            <div class="truck_1"><i class="fa-solid fa-truck-fast" style="color: #bbbbbb;"></i>
                <span>Authentic <br> lavours</span>
            </div>
            <div class="truck_1"><i class="fa-solid fa-truck-fast" style="color: #bbbbbb;"></i>
                <span>Fast<br> delivery</span>
            </div>
        </div>
    </div>
    
    <!-- ------------------------- CONTENT DIV 2 (CB PICS) ---------------------------- -->
    
    <div class="content_2">
        <div class="cb_pic_div">
            <img class="cb_img_0" src="./imgs/cb1.png" alt="">
            <img class="cb_img_1" src="./imgs/cb2.png" alt="">
            <img class="cb_img_2" src="./imgs/cb3.png" alt="">
            <img class="cb_img_3" src="./imgs/cb4.png" alt="">
            <img class="cb_img_4" src="./imgs/cb5.png" alt="">
    
        </div>
        <div class="small_imgs_div">
    
            <div class="small_imgs for_opacity_1">
                <img class="cb_img small_img_1" src="./imgs/cb1.png" alt="">
            </div>
            <div class="small_imgs for_opacity_2">
                <img class="cb_img small_img_2" src="./imgs/cb2.png" alt="">
            </div>
            <div class="small_imgs for_opacity_3">
                <img class="cb_img small_img_3" src="./imgs/cb3.png" alt="">
            </div>
            <div class="small_imgs for_opacity_4">
                <img class="cb_img small_img_4" src="./imgs/cb4.png" alt="">
            </div>
            <div class="small_imgs for_opacity_5">
                <img class="cb_img small_img_5" src="./imgs/cb5.png" alt="">
            </div>
        </div>
    </div>
    
    
    
    
    </div>
    <!-- ------------------------------ STORY_DIV ------------------------------ -->
    <div class="title">
    <h1>The Taste That Tells A Story</h1>
    </div>
    
    <div class="story_div">
    <div class="content_3">
        <p>From the royal kitchens of the mughals <br>to the bustling streets of Hyderabad, <br> our briyani
            carries a legacy of flavour <br>and culture. Made with age-old <br>recipes and premium ingredients,
            <br>every serving is a tribute to <br>authenticity.</p>
    </div>
    <div class="chefs_lab_container">
        <h2 style="color: #FFA608; text-align: center; font-size: 24px; margin-bottom: 20px; font-weight: bold;"><i class="fa fa-utensils"></i> Chef's Lab: Customize Your Plate</h2>
        
        <div class="chefs_lab_grid">
            <!-- Customization Controls -->
            <div class="customizer_panel" style="display: flex; flex-direction: column; gap: 15px;">
                <!-- Step 1: Base Rice -->
                <div>
                    <h4 style="color: white; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 8px; font-weight: bold;">1. Select Base Rice</h4>
                    <div style="display: flex; gap: 10px;">
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; cursor: pointer; color: white; flex: 1; text-align: center; font-size: 13px;">
                            <input type="radio" name="rice_sel" value="Basmati" checked style="margin-right: 5px;"> Basmati Rice ($5)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; cursor: pointer; color: white; flex: 1; text-align: center; font-size: 13px;">
                            <input type="radio" name="rice_sel" value="Jeeraga Samba" style="margin-right: 5px;"> Jeeraga Samba ($6)
                        </label>
                    </div>
                </div>

                <!-- Step 2: Meat/Veg protein -->
                <div>
                    <h4 style="color: white; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 8px; font-weight: bold;">2. Select Protein</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 10px; border-radius: 8px; cursor: pointer; color: white; text-align: center; font-size: 13px;">
                            <input type="radio" name="protein_sel" value="Royal Mutton" checked style="margin-right: 5px;"> Royal Mutton ($8)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 10px; border-radius: 8px; cursor: pointer; color: white; text-align: center; font-size: 13px;">
                            <input type="radio" name="protein_sel" value="Juicy Chicken" style="margin-right: 5px;"> Juicy Chicken ($6)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 10px; border-radius: 8px; cursor: pointer; color: white; text-align: center; font-size: 13px;">
                            <input type="radio" name="protein_sel" value="Paneer Tikka" style="margin-right: 5px;"> Paneer Tikka ($5)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 10px; border-radius: 8px; cursor: pointer; color: white; text-align: center; font-size: 13px;">
                            <input type="radio" name="protein_sel" value="Garden Veggies" style="margin-right: 5px;"> Fresh Veggies ($4)
                        </label>
                    </div>
                </div>

                <!-- Step 3: Spice Level -->
                <div>
                    <h4 style="color: white; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 8px; font-weight: bold;">3. Spice Level</h4>
                    <div style="display: flex; gap: 10px;">
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; cursor: pointer; color: white; flex: 1; text-align: center; font-size: 13px;">
                            <input type="radio" name="spice_sel" value="Mild" checked style="margin-right: 5px;"> Mild (No Extra)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; cursor: pointer; color: white; flex: 1; text-align: center; font-size: 13px;">
                            <input type="radio" name="spice_sel" value="Medium Royal" style="margin-right: 5px;"> Medium Royal
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 8px; cursor: pointer; color: white; flex: 1; text-align: center; font-size: 13px;">
                            <input type="radio" name="spice_sel" value="Hyderabad Fire" style="margin-right: 5px;"> Hyderabad Fire!
                        </label>
                    </div>
                </div>

                <!-- Step 4: Add-ons -->
                <div>
                    <h4 style="color: white; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; margin-bottom: 8px; font-weight: bold;">4. Extras & Toppings</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                        <label style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; cursor: pointer; color: white; font-size: 12px;">
                            <input type="checkbox" class="addon_sel" value="Crispy Onions" data-price="1" style="margin-right: 5px;"> Fried Onions (+$1)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; cursor: pointer; color: white; font-size: 12px;">
                            <input type="checkbox" class="addon_sel" value="Rich Cashews" data-price="2" style="margin-right: 5px;"> Roast Cashews (+$2)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; cursor: pointer; color: white; font-size: 12px;">
                            <input type="checkbox" class="addon_sel" value="Boiled Egg" data-price="1" style="margin-right: 5px;"> Boiled Egg (+$1)
                        </label>
                        <label style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; cursor: pointer; color: white; font-size: 12px;">
                            <input type="checkbox" class="addon_sel" value="Extra Raita" data-price="1" style="margin-right: 5px;"> Creamy Raita (+$1)
                        </label>
                    </div>
                </div>

                
            </div>

            <!-- Plate Preview Panel -->
            <div class="plate_preview_panel" style="background: white; border-radius: 16px; padding: 20px; color: black; display: flex; flex-direction: column; align-items: center; justify-content: space-between; box-shadow: 0 10px 25px rgba(0,0,0,0.3); text-align: center; min-height: 380px;">
                <h4 style="font-weight: bold; color: #880203; font-size: 16px; margin-bottom: 5px;">Active Plate Preview</h4>
                
                <div style="position: relative; width: 140px; height: 140px; margin: 10px 0;">
                    <!-- Base Biryani image -->
                    <img id="preview_biryani_img" src="./imgs/cb1.png" style="width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s ease;">
                    
                    <!-- Decorative dynamic topping badges inside the plate -->
                    <div id="preview_spice_badge" style="position: absolute; top: -5px; right: -5px; background: red; color: white; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; display: none; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">SPICY!</div>
                    <div id="preview_protein_badge" style="position: absolute; bottom: -5px; left: -5px; background: #880203; color: white; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Mutton</div>
                </div>

                <!-- Plate Spec Receipt -->
                <div style="width: 100%; background: #880203; padding: 12px; border-radius: 10px; font-size: 12px; line-height: 16px; text-align: left; margin-bottom: 10px; border: 1px solid #eee;">
                    <div style="display: flex; justify-content: space-between;"><strong>Rice:</strong> <span id="rec_rice">Basmati ($5)</span></div>
                    <div style="display: flex; justify-content: space-between;"><strong>Protein:</strong> <span id="rec_protein">Royal Mutton ($8)</span></div>
                    <div style="display: flex; justify-content: space-between;"><strong>Spice:</strong> <span id="rec_spice">Mild</span></div>
                    <div style="display: flex; justify-content: space-between;"><strong>Extras:</strong> <span id="rec_extras" style="color: ; font-size:10px;">None</span></div>
                    <div style="height: 1px; background: #ddd; margin: 6px 0;"></div>
                    <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: bold; color: #880203;">
                        <span>Estimated Total:</span>
                        <span id="rec_total">$13.00</span>
                    </div>
                </div>

                <!-- HR Special Area inside receipt -->
                <div id="hr_certificate_box" style="display: none; width: 100%; background: #fffbeb; border: 1px gold dashed; border-radius: 8px; padding: 10px; font-size: 11px; margin-bottom: 10px;">
                    <span style="color: #b8860b; font-weight: bold; font-size: 12px; display: block; margin-bottom: 2px;">🏆 Honorary Chef Certificate 🏆</span>
                    <strong style="color: #880203; font-size: 12px;" id="cert_hr_name">Sarah</strong>
                    <p style="color: #444; margin: 3px 0 0 0; font-size: 10px; line-height: 12px;">is officially certified as a Master Biryani taster! <br><strong>"Let's get this candidate hired!"</strong></p>
                </div>

                <button id="add_custom_plate_btn" style="width: 100%; background: #FFA608; border: none; border-radius: 10px; padding: 10px; font-size: 14px; font-weight: bold; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa fa-plus-circle"></i> Add Custom Plate to Order
                </button>
            </div>
        </div>
    </div>
    </div>
    
    <!-- -------------------------------- CARD DIV ---------------------------------------- -->
    
    <div class="title">
    <h1>What's Makes Our Briyani Special?</h1>
    </div>
    
    <div class="card_div">
    <div class="card_content_1 card_left">
        <img src="./imgs/spoon.png" alt="">
    </div>
    <div class="card_content_2 card_right">
        <p>We use the finest <br> basmati rice, <br>fresh hurbs, <br>and premium spices.</p>
    </div>
    
    <div class="cover_div">
        <div class="cover_div_left">
            <h1 id="h1_1">We are</h1>
            <h1 id="h1_2">in the</h1>
        </div>
        <div class="cover_div_right">
            <h1 id="h1_3">Famous</h1>
            <h1 id="h1_4">Spice</h1>
        </div>
    </div>
    
    </div>
    <!-- ------------------------------- FOOD LOVE DIV ----------------------------------- -->
    <div class="title">
    <h1>Signature Food Loved By Thousands</h1>
    </div>
    
    <div class="food_love_div">
    
    <div class="list_box_div">
        <div class="list_box list_box_1"><img id="list_img1" src="./imgs/cb1.png" alt="">Briyani</div>
        <div class="list_box list_box_2"><img id="list_img2" src="./imgs/cb7.png" alt="">Fried Rice</div>
        <div class="list_box list_box_3"><img id="list_img3" src="./imgs/fries.png" alt="">Fries</div>
        <div class="list_box list_box_4"><img id="list_img4" src="./imgs/combo_cb.png" alt="">Combo
            <div class="side_bar">
                <div class="point point_style"></div>
            </div>
        </div>
    </div>
    
    <div class="slide_div">
    
        <div class="slide_div_whitebox">
            <div class="white_box_inside_contents white_box_inside_contents_1">
                <div class="whitebox_content1">Hyderabadi <br> Dum Briyani</div>
                <div class="whitebox_content2">A fragnant mix of basmati rice, <br>marinated meat, and saffron,
                    slow- <br> cooked to prefection in traditional <br>dum style.</div>
    
                <div class="small_box_div small_box_2">
                    <div class="small_box_div_1"><i class="fa-solid fa-angle-right"></i></div>
                    <div class="small_box_div_2">Order Now</div>
                </div>
    
                <div class="arrow_div">
                    <div class="arrow_1"><i class="fa-solid fa-angle-left"></i></div>
                    <div class="arrow_2"><i class="fa-solid fa-angle-right"></i></div>
                </div>
    
                <div class="slide_img_div">
                    <img src="./imgs/cb7.png" alt="">
                </div>
    
            </div>
    
            <div class="white_box_inside_contents white_box_inside_contents_2">
                <div class="whitebox_content1">Lucknowi <br> Briyani</div>
                <div class="whitebox_content2">A fragnant mix of basmati rice, <br>marinated meat, and saffron,
                    slow- <br> cooked to prefection in traditional <br>dum style.</div>
    
                <div class="small_box_div small_box_2">
                    <div class="small_box_div_1"><i class="fa-solid fa-angle-right"></i></div>
                    <div class="small_box_div_2">Order Now</div>
                </div>
    
                <div class="arrow_div">
                    <div class="arrow_1 arrow_11"><i class="fa-solid fa-angle-left"></i></div>
                    <div class="arrow_2"><i class="fa-solid fa-angle-right"></i></div>
                </div>
    
                <div class="slide_img_div">
                    <img src="./imgs/cb7.png" alt="">
                </div>
    
            </div>
    
        </div>
    </div>
    
    </div>
    <!-- -------------------------- RAIL DIVS ------------------------------ -->
    <div class="title">
    <h1>What Our Customer Say</h1>
    </div>
    
    <div class="rail_div">
    <div class="rail_box_div">
    
        <div class="rail_box rail_box_1">"Absolutely delicious! <br> The Hyderabadi biryani was <br> perfectly spiced and the <br> meat was tender." <br> <br> — Priya Menon
            <div class="star_div"><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i></div>     
        </div>
    
        <div class="rail_box rail_box_2">"Fast delivery, <br> great packaging, and <br> the aroma was mouthwatering. <br> Best biryani <br>I’ve had in months!" <br> <br> — Ravi Kumar
            <div class="star_div"><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i></div>
        </div>
    
        <div class="rail_box rail_box_3">Loved the generous <br> portion size and the <br> raita was a perfect match.<br> Highly recommend for <br> biryani lovers!<br><br> — Sneha Reddy
            <div class="star_div"><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i></div>
        </div>
    
        <div class="rail_box rail_box_4">Rice was dry<br> and lacked flavor.<br> Not worth the price.<br><br> — Arjun Patel
            <div class="star_div"><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i></div>
        </div>
    
        <div class="rail_box rail_box_5">Delivery was delayed <br> by over an hour<br> and the biryani arrived cold.<br> Very disappointed.<br><br> — Meera Joshi
            <div class="star_div"><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i></div>
        </div>
    
        <div class="rail_box rail_box_6">Too oily<br> and the chicken pieces <br> were mostly bone.<br> Needs serious improvement.<br><br> — Karthik Srinivasan
            <div class="star_div"><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i><i class="fa-solid fa-star" style="color: #ffdd00;"></i></div>
        </div>
    
    </div>
    </div>
    
    <!-- ------------------------ FAQ's DIV -------------------------- -->
    <div class="title">
    <h1>Frequently Asked Questions</Q></h1>
    </div>
    
    <div class="faq_div">
    
    <div class="faq_content_1">
        <div><h1>FAQ's</h1></div>
        <div><p>For any further inquiries about our <br>menu,orders, or catering servings, <br>please feel free to get in touch <br>with us.</p></div>
        <div><button>bhaibriyani@gmail.com</button></div>
    </div>
    
    <div class="faq_content_2">
    
        <div class="qn1_div">
            <div class="qn qn_1">How Can I Place MY Order? <i id="arrow1" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_1">To place your order, simply browse the menu, select your items.</div>
        </div>
        
        <div class="qn1_div">
            <div class="qn qn_2">Do You Offer Home Delivery? <i id="arrow2" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_2">Yes, we offer fastest home delivery straight to your doorstep.</div>
        </div>
    
        <div class="qn1_div">
            <div class="qn qn_3">Can I Customize My Briyani? <i id="arrow3" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_3">Yes, you can choose how spicy you want your biryani.</div>
        </div>
    
        <div class="qn1_div">
            <div class="qn qn_4">Do You Have Family Packs? <i id="arrow4" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_4">Yes,We have special family packs perfect for sharing and saving.</div>
        </div>
    
        <div class="qn1_div">
            <div class="qn qn_5">What Payment Option Do You Accept? <i id="arrow5" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_5">We accept payments via UPI,debit cards,net banking & cash on delivery.</div>
        </div>
    
        <div class="qn1_div">
            <div class="qn qn_6">What If I Have Issue In My Order? <i id="arrow6" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_6">If there's a problem, just reach out—we’ll sort it fast.</div>
        </div>
    
        <div class="qn1_div">
            <div class="qn qn_7">How Can I Contact Customer Support? <i id="arrow7" class="fa-solid fa-chevron-down"></i></div>
            <div class="ans ans_7">You can reach support by chat, call, or email on our site.</div>
        </div>
    
    </div>
    </div>` +footer()
    
    const cb_img_0 = document.querySelector(".cb_img_0")
    const cb_img_1 = document.querySelector(".cb_img_1")
    const cb_img_2 = document.querySelector(".cb_img_2")
    const cb_img_3 = document.querySelector(".cb_img_3")
    const cb_img_4 = document.querySelector(".cb_img_4")
    
    const small_img_1 = document.querySelector(".small_img_1")
    const small_img_2 = document.querySelector(".small_img_2")
    const small_img_3 = document.querySelector(".small_img_3")
    const small_img_4 = document.querySelector(".small_img_4")
    const small_img_5 = document.querySelector(".small_img_5")
    
    function slide1(){
        cb_img_0.classList.remove("cb_img_000")
        cb_img_0.classList.add('cb_img_00')
        cb_img_1.classList.add('cb_img_11')
        cb_img_2.classList.remove('cb_img_22')
        cb_img_3.classList.remove('cb_img_33')
        cb_img_4.classList.remove('cb_img_44')
    }
    small_img_2.addEventListener("click", slide1)
    
    function slide2(){
        cb_img_0.classList.add('cb_img_00')
        cb_img_0.classList.remove("cb_img_000")
        cb_img_1.classList.remove('cb_img_11')
        cb_img_3.classList.remove('cb_img_33')
        cb_img_4.classList.remove('cb_img_44')
        cb_img_2.classList.add('cb_img_22')
    }
    small_img_3.addEventListener("click", slide2)
    
    function slide3(){
        cb_img_0.classList.add('cb_img_00')
        cb_img_0.classList.remove("cb_img_000")
        cb_img_1.classList.remove('cb_img_11')
        cb_img_2.classList.remove('cb_img_22')
        cb_img_4.classList.remove('cb_img_44')
        cb_img_3.classList.add('cb_img_33')
    }
    small_img_4.addEventListener("click", slide3)
    
    function slide4(){
        cb_img_0.classList.add('cb_img_00')
        cb_img_0.classList.remove("cb_img_000")
        cb_img_1.classList.remove('cb_img_11')
        cb_img_2.classList.remove('cb_img_22')
        cb_img_3.classList.remove('cb_img_33')
        cb_img_4.classList.add('cb_img_44')
    }
    small_img_5.addEventListener("click", slide4)
    
    function slide5(){
        cb_img_0.classList.add("cb_img_000")
        cb_img_1.classList.remove('cb_img_11')
        cb_img_2.classList.remove('cb_img_22')
        cb_img_3.classList.remove('cb_img_33')
        cb_img_4.classList.remove('cb_img_44')
    }
    small_img_1.addEventListener("click", slide5)
    
    const opacity_1 = document.querySelector(".for_opacity_1")
    const opacity_2 = document.querySelector(".for_opacity_2")
    const opacity_3 = document.querySelector(".for_opacity_3")
    const opacity_4 = document.querySelector(".for_opacity_4")
    const opacity_5 = document.querySelector(".for_opacity_5")
    
    function opacity1(){
        opacity_1.classList.add("opacity_1")
        opacity_2.classList.remove("opacity_1")
        opacity_3.classList.remove("opacity_1")
        opacity_4.classList.remove("opacity_1")
        opacity_5.classList.remove("opacity_1")
    }
    opacity_1.addEventListener("click", opacity1)
    
    function opacity2(){
        opacity_2.classList.add("opacity_1")
        opacity_1.classList.remove("opacity_1")
        opacity_3.classList.remove("opacity_1")
        opacity_4.classList.remove("opacity_1")
        opacity_5.classList.remove("opacity_1")
    }
    opacity_2.addEventListener("click", opacity2)
    
    function opacity3(){
        opacity_3.classList.add("opacity_1")
        opacity_2.classList.remove("opacity_1")
        opacity_1.classList.remove("opacity_1")
        opacity_4.classList.remove("opacity_1")
        opacity_5.classList.remove("opacity_1")
    }
    opacity_3.addEventListener("click", opacity3)
    
    function opacity4(){
        opacity_4.classList.add("opacity_1")
        opacity_2.classList.remove("opacity_1")
        opacity_3.classList.remove("opacity_1")
        opacity_1.classList.remove("opacity_1")
        opacity_5.classList.remove("opacity_1")
    }
    opacity_4.addEventListener("click", opacity4)
    
    function opacity5(){
        opacity_5.classList.add("opacity_1")
        opacity_2.classList.remove("opacity_1")
        opacity_3.classList.remove("opacity_1")
        opacity_4.classList.remove("opacity_1")
        opacity_1.classList.remove("opacity_1")
    }
    opacity_5.addEventListener("click", opacity5)
    
    // for cover moving....
    
    let left_cover = document.querySelector(".cover_div_left")
    let right_cover = document.querySelector(".cover_div_right")
    
    function leftCover(){
        left_cover.classList.add("cover_left")
        right_cover.classList.add("cover_right")
    }
    left_cover.addEventListener("click", leftCover)
    
    function rightCover(){
        left_cover.classList.add("cover_left")
        right_cover.classList.add("cover_right")
    }
    right_cover.addEventListener("click", rightCover)
    
    //for card moving...
    
    const left_card = document.querySelector(".card_content_1")
    const right_card = document.querySelector(".card_content_2")
    
    function leftCard(){
        left_card.classList.remove("card_left")
        right_card.classList.remove("card_right")
    }
    right_cover.addEventListener("click", leftCard)
    left_cover.addEventListener("click", leftCard)
    
    // List Box's Color
    
    const list_box_1 = document.querySelector(".list_box_1")
    const list_box_2 = document.querySelector(".list_box_2")
    const list_box_3 = document.querySelector(".list_box_3")
    const list_box_4 = document.querySelector(".list_box_4")
    
    const point_style = document.querySelector(".point_style")
    
    list_box_1.addEventListener("click",()=>{
        list_box_1.style="background-color:white;color:#FFA608"
        list_box_2.style=""
        list_box_3.style=""
        list_box_4.style=""
        point_style.style="position:relative; top:0;"
    })
    
    list_box_2.addEventListener("click",()=>{
        list_box_2.style="background-color:white;color:#FFA608"
        list_box_1.style=""
        list_box_3.style=""
        list_box_4.style=""
        point_style.style="position:relative; top:100px;"
    })
    
    list_box_3.addEventListener("click",()=>{
        list_box_3.style="background-color:white;color:#FFA608"
        list_box_1.style=""
        list_box_2.style=""
        list_box_4.style=""
        point_style.style="position:relative; top:200px;"
    })
    
    list_box_4.addEventListener("click",()=>{
        list_box_4.style="background-color:white;color:#FFA608"
        list_box_1.style=""
        list_box_2.style=""
        list_box_3.style=""
        point_style.style="position:relative; top:300px;"
    })
    
    //slide box actions
    
    const whitebox_content1 = document.querySelector(".white_box_inside_contents_1")
    const whitebox_content2 = document.querySelector(".white_box_inside_contents_2")
    
    const right_arrow = document.querySelector(".arrow_2")
    const left_arrow = document.querySelector(".arrow_11")
    
    
    right_arrow.addEventListener("click", ()=>{
        whitebox_content1.style="position:absolute;transition-duration:0.4s;transform:translatex(-550px);opacity:0;"
        whitebox_content2.style="left:-1px;opacity:5;transition-duration:0.8s;"
    })
    
    left_arrow.addEventListener("click", ()=>{
        whitebox_content1.style="transition-duration:1s;transform:translatex(1px);opacity:5;"
        whitebox_content2.style="left:800px;opacity:0;transition-duration:0.5s;"
    })
    
    const qn_1 = document.querySelector(".qn_1")
    const qn_2 = document.querySelector(".qn_2")
    const qn_3 = document.querySelector(".qn_3")
    const qn_4 = document.querySelector(".qn_4")
    const qn_5 = document.querySelector(".qn_5")
    const qn_6 = document.querySelector(".qn_6")
    const qn_7 = document.querySelector(".qn_7")
    
    const ans_1 = document.querySelector(".ans_1")
    const ans_2 = document.querySelector(".ans_2")
    const ans_3 = document.querySelector(".ans_3")
    const ans_4 = document.querySelector(".ans_4")
    const ans_5 = document.querySelector(".ans_5")
    const ans_6 = document.querySelector(".ans_6")
    const ans_7 = document.querySelector(".ans_7")
    
    const arr1 = document.getElementById("arrow1")
    const arr2 = document.getElementById("arrow2")
    const arr3 = document.getElementById("arrow3")
    const arr4 = document.getElementById("arrow4")
    const arr5 = document.getElementById("arrow5")
    const arr6 = document.getElementById("arrow6")
    const arr7 = document.getElementById("arrow7")
    
    function qn1(){
        ans_1.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_1.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr1.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_1.addEventListener("click", qn1)
    
    function qn2(){
        ans_2.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_2.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr2.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_2.addEventListener("click", qn2)
    
    function qn3(){
        ans_3.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_3.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr3.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_3.addEventListener("click", qn3)
    
    function qn4(){
        ans_4.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_4.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr4.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_4.addEventListener("click", qn4)
    
    function qn5(){
        ans_5.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_5.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr5.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_5.addEventListener("click", qn5)
    
    function qn6(){
        ans_6.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_6.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr6.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_6.addEventListener("click", qn6)
    
    function qn7(){
        ans_7.style="transform:translateY(0px);height:70px;border-top-left-radius:0px;border-top-right-radius:0px;"
        qn_7.style="border-bottom-left-radius:0px;border-bottom-right-radius:0px;background-color:#FFA608;"
        arr7.style="transform:rotatez(-180deg);transition-duration:1s;"
    }
    qn_7.addEventListener("click", qn7)

    // --- Chef's Lab Interactive Customizer Event Binding ---
    const riceRadios = document.querySelectorAll('input[name="rice_sel"]');
    const proteinRadios = document.querySelectorAll('input[name="protein_sel"]');
    const spiceRadios = document.querySelectorAll('input[name="spice_sel"]');
    const addonCheckboxes = document.querySelectorAll('.addon_sel');
    const hrNameInput = document.getElementById('hr_name_input');
    const addCustomBtn = document.getElementById('add_custom_plate_btn');
    
    function updateBiryaniBuilder() {
        const riceSel = document.querySelector('input[name="rice_sel"]:checked');
        const proteinSel = document.querySelector('input[name="protein_sel"]:checked');
        const spiceSel = document.querySelector('input[name="spice_sel"]:checked');
        
        if (!riceSel || !proteinSel || !spiceSel) return;
        
        let riceVal = riceSel.value;
        let proteinVal = proteinSel.value;
        let spiceVal = spiceSel.value;
        
        let ricePrice = riceVal === "Basmati" ? 5 : 6;
        let proteinPrice = 4;
        if (proteinVal === "Royal Mutton") proteinPrice = 8;
        else if (proteinVal === "Juicy Chicken") proteinPrice = 6;
        else if (proteinVal === "Paneer Tikka") proteinPrice = 5;
        
        let basePrice = ricePrice + proteinPrice;
        
        let extrasPrice = 0;
        let extrasArr = [];
        document.querySelectorAll('.addon_sel:checked').forEach(cb => {
            extrasPrice += Number(cb.getAttribute('data-price'));
            extrasArr.push(cb.value);
        });
        
        let totalPrice = basePrice + extrasPrice;
        
        // Update receipt elements
        const recRice = document.getElementById('rec_rice');
        const recProtein = document.getElementById('rec_protein');
        const recSpice = document.getElementById('rec_spice');
        const recExtras = document.getElementById('rec_extras');
        const recTotal = document.getElementById('rec_total');
        
        if (recRice) recRice.innerText = riceVal + " ($" + ricePrice + ")";
        if (recProtein) recProtein.innerText = proteinVal + " ($" + proteinPrice + ")";
        if (recSpice) recSpice.innerText = spiceVal;
        if (recExtras) recExtras.innerText = extrasArr.length > 0 ? extrasArr.join(", ") : "None";
        if (recTotal) recTotal.innerText = "$" + totalPrice.toFixed(2);
        
        // Dynamic badges inside plate preview
        const spiceBadge = document.getElementById('preview_spice_badge');
        if (spiceBadge) {
            if (spiceVal === "Hyderabad Fire") {
                spiceBadge.style.display = "block";
                spiceBadge.innerText = "🔥 EXTREME!";
            } else if (spiceVal === "Medium Royal") {
                spiceBadge.style.display = "block";
                spiceBadge.innerText = "🌶️ Medium";
            } else {
                spiceBadge.style.display = "none";
            }
        }
        
        const previewProtein = document.getElementById('preview_protein_badge');
        if (previewProtein) {
            previewProtein.innerText = proteinVal.replace("Royal ", "").replace("Juicy ", "");
        }
        
        // Recruiter dynamic custom greeting certificate
        const hrInputVal = hrNameInput ? hrNameInput.value.trim() : "";
        const certBox = document.getElementById('hr_certificate_box');
        const certName = document.getElementById('cert_hr_name');
        if (certBox && certName) {
            if (hrInputVal.length > 0) {
                certBox.style.display = "block";
                certName.innerText = hrInputVal;
            } else {
                certBox.style.display = "none";
            }
        }
    }
    
    // Bind listeners
    riceRadios.forEach(r => r.addEventListener('change', updateBiryaniBuilder));
    proteinRadios.forEach(r => r.addEventListener('change', updateBiryaniBuilder));
    spiceRadios.forEach(r => r.addEventListener('change', updateBiryaniBuilder));
    addonCheckboxes.forEach(cb => cb.addEventListener('change', updateBiryaniBuilder));
    if (hrNameInput) {
        hrNameInput.addEventListener('input', updateBiryaniBuilder);
    }
    
    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', () => {
            const riceSel = document.querySelector('input[name="rice_sel"]:checked');
            const proteinSel = document.querySelector('input[name="protein_sel"]:checked');
            const spiceSel = document.querySelector('input[name="spice_sel"]:checked');
            
            if (!riceSel || !proteinSel || !spiceSel) return;
            
            let riceVal = riceSel.value;
            let proteinVal = proteinSel.value;
            let spiceVal = spiceSel.value;
            
            let ricePrice = riceVal === "Basmati" ? 5 : 6;
            let proteinPrice = 4;
            if (proteinVal === "Royal Mutton") proteinPrice = 8;
            else if (proteinVal === "Juicy Chicken") proteinPrice = 6;
            else if (proteinVal === "Paneer Tikka") proteinPrice = 5;
            
            let extrasPrice = 0;
            let extrasArr = [];
            document.querySelectorAll('.addon_sel:checked').forEach(cb => {
                extrasPrice += Number(cb.getAttribute('data-price'));
                extrasArr.push(cb.value);
            });
            
            let totalPrice = ricePrice + proteinPrice + extrasPrice;
            
            let itemDesc = "Rice: " + riceVal + ", Protein: " + proteinVal + ", Spice: " + spiceVal;
            if (extrasArr.length > 0) {
                itemDesc += ", Extras: " + extrasArr.join(", ");
            }
            
            let customItem = {
                name: proteinVal + " Custom Biryani",
                price: totalPrice,
                image: "./imgs/cb1.png",
                qty: 1,
                desc: itemDesc
            };
            
            // Add custom combination to cart
            let existing = cart.find(item => item.name === customItem.name && item.desc === customItem.desc);
            if (existing) {
                existing.qty++;
            } else {
                cart.push(customItem);
            }
            
            updateCartBadge();
            showToast(`Custom Chef's Special added to your Cart!`);
        });
    }

    // Call update first time to sync starting values
    updateBiryaniBuilder();
}
landingpage()


//2nd Page MENU CARD

let menu_card = document.querySelector(".menu")

function menu(){
    document.querySelector(".js_root").innerHTML=`

        <div class="banner_img">
            <img src="./page2 imgs/banner.png" alt="">
        </div>

        <!-- ------------------------- RECTANGLE BOXE'S --------------------------- -->

        <div id="title">
            <h1>Offers</h1>
        </div>

        <div class="rectangle_box_div">
            <div class="rectangle_box">
                <div class="rectangle_box_1">
                    <img src="./page2 imgs/p1.png" alt="">
                </div>
                <div class="rectangle_box_2">
                    <img src="./page2 imgs/p2.png" alt="">
                </div>
                <div class="rectangle_box_3">
                    <img src="./page2 imgs/p1.png" alt="">
                </div>
                <!-- <div class="rectangle_box_4"></div> -->
            </div>
        </div>

        <!------------------------------ SMALL SQUARE BOX --------------------------------  -->

        <div id="title">
            <h1>Categories</h1>
        </div>

        <div class="sml_square_box_div">
            <div class="sml_square_box_1"><img src="./page2 imgs/img1.png" alt="">
                <h4>Lunch Combo Starting @299</h4>
            </div>
            <div class="sml_square_box_2"><img src="./page2 imgs/img2.png" alt="">
                <h4>Hyderabadi Briyani</h4>
            </div>
            <div class="sml_square_box_3"><img src="./page2 imgs/img3.png" alt="">
                <h4>Everyday Briyani Combos</h4>
            </div>
            <div class="sml_square_box_4"><img src="./page2 imgs/img4.png" alt="">
                <h4>Kebabs</h4>
            </div>
        </div>
        <!------------------------------ SMALL SQUARE BOX --------------------------------  -->

        <div id="title">
            <h1>Lunch Combos Starting @299</h1>
        </div>

        <div class="square_box_div">

            <div class="square_box_1">
                <img src="./page2 imgs/pic2.png" alt="">
                <div id="cb_name">
                    <h2>Dal Makhani [400gms] + 4 Rumali Roti + [1pc] Gulab Jamun</h2> <br>
                    <h3>504 people ordered in the last week</h3>
                </div>
                <div id="rate">
                    <h1>$299</h1>
                    <button>Add +</button>
                </div>
            </div>


            <div class="square_box_2">
                <img src="./page2 imgs/pic1.png" alt="">
                <div id="cb_name">
                    <h2>Paneer Nawabi [500gms] + 4 Rumali Roti + [1pc] Gulab Jamun</h2> <br>
                    <h3>505 people ordered in the last week</h3>
                </div>
                <div id="rate">
                    <h1>$329</h1>
                    <button>Add +</button>
                </div>
            </div>


            <div class="square_box_3">
                <img src="./page2 imgs/pic3.png" alt="">
                <div id="cb_name">
                    <h2>Veg Hyderabadi Briyani [ 1/2 Kg ]</h2> <br>
                    <p>Serves 1-2 Fresh vegetables are marinated in a <br> mixture of freshly ground BBK spices &
                        layered with <br> long grain basmati rice in the handi and slow cooked
                    <p>
                </div>
                <div id="rate">
                    <h1>$389</h1>
                    <button>Add +</button>
                </div>
            </div>


            <div class="square_box_4">
                <img src="./page2 imgs/pic4.png" alt="">
                <div id="cb_name">
                    <h2>Chicken Hyderabadi Briyani [ 1/2 Kg ]</h2> <br>
                    <p>Serves 1-2 Fresh vegetables are marinated in a <br> mixture of freshly ground BBK spices &
                        layered with <br> long grain basmati rice in the handi and slow cooked
                    <p>
                </div>
                <div id="rate">
                    <h1>$589</h1>
                    <button>Add +</button>
                </div>
            </div>


            <div class="square_box_5">
                <img src="./page2 imgs/pic5.png" alt="">
                <div id="cb_name">
                    <h2>Chicken Hyderabadi Briyani [ 1/2 Kg ]</h2> <br>
                    <p>Serves 1-2 Fresh vegetables are marinated in a <br> mixture of freshly ground BBK spices &
                        layered with <br> long grain basmati rice in the handi and slow cooked
                    <p>
                </div>
                <div id="rate">
                    <h1>$589</h1>
                    <button>Add +</button>
                </div>
            </div>

            <div class="square_box_6">
                <img src="./page2 imgs/pic6.png" alt="">
                <div id="cb_name">
                    <h2>Chicken Hyderabadi Briyani [ 1/2 Kg ]</h2> <br>
                    <p>Serves 1-2 Fresh vegetables are marinated in a <br> mixture of freshly ground BBK spices &
                        layered with <br> long grain basmati rice in the handi and slow cooked
                    <p>
                </div>
                <div id="rate">
                    <h1>$589</h1>
                    <button>Add +</button>
                </div>
            </div>


            <div class="square_box_7">
                <img src="./page2 imgs/pic7.png" alt="">
                <div id="cb_name">
                    <h2>Chicken Hyderabadi Briyani [ 1/2 Kg ]</h2> <br>
                    <p>Serves 1-2 Fresh vegetables are marinated in a <br> mixture of freshly ground BBK spices &
                        layered with <br> long grain basmati rice in the handi and slow cooked
                    <p>
                </div>
                <div id="rate">
                    <h1>$589</h1>
                    <button>Add +</button>
                </div>
            </div>


            <div class="square_box_8">
                <img src="./page2 imgs/pic1.png" alt="">
                <div id="cb_name">
                    <h2>Chicken Hyderabadi Briyani [ 1/2 Kg ]</h2> <br>
                    <p>Serves 1-2 Fresh vegetables are marinated in a <br> mixture of freshly ground BBK spices &
                        layered with <br> long grain basmati rice in the handi and slow cooked
                    <p>
                </div>
                <div id="rate">
                    <h1>$589</h1>
                    <button>Add +</button>
                </div>
            </div>

        </div>

        <!-- --------------------------- FOOTER ----------------------------- -->

`+footer()

    // Dynamically parse all food menu item cards and bind "Add to Cart" listeners
    const foodCards = document.querySelectorAll('.square_box_div > div');
    foodCards.forEach(card => {
        const titleEl = card.querySelector('#cb_name h2');
        const priceEl = card.querySelector('#rate h1');
        const btnEl = card.querySelector('#rate button');
        const imgEl = card.querySelector('img');
        
        if (titleEl && priceEl && btnEl) {
            btnEl.addEventListener('click', () => {
                const name = titleEl.innerText.trim();
                const priceText = priceEl.innerText.trim();
                const price = Number(priceText.replace('$', ''));
                const image = imgEl ? imgEl.getAttribute('src') : "./page2 imgs/pic1.png";
                
                let existing = cart.find(item => item.name === name && !item.desc);
                if (existing) {
                    existing.qty++;
                } else {
                    cart.push({
                        name: name,
                        price: price,
                        image: image,
                        qty: 1
                    });
                }
                
                updateCartBadge();
                showToast(`"${name}" added to your Cart!`);
            });
        }
    });

//Menu Offer details
const rectangle_box1 = document.querySelector(".rectangle_box_1");
const rectangle_box2 = document.querySelector(".rectangle_box_2");
const rectangle_box3 = document.querySelector(".rectangle_box_3");

rectangle_box1.addEventListener("click", offerDetails);
rectangle_box2.addEventListener("click", offerDetails);
rectangle_box3.addEventListener("click", offerDetails);
}
menu_card.addEventListener("click", menu);

//Menu Offer details Showing HTML codes
function offerDetails(){
    document.querySelector(".js_root").innerHTML=`<div class="offer_div">

            <div class="offer_div_head">
                <h1>Offer Details</h1>
                <h2 id="offer_x">X</h2>
            </div>

            <div class="offer_div_content_1">
                <div class="offer_img_div">
                    <img src="./imgs/offer1.png" alt="">
                </div>
                <div>
                    <h1>FLAT 25% OFF on Take Away Orders</h1>
                    <p>No minimum oreder amount</p>
                </div>
            </div>

            <p>Now get FLAT 25% OFF on all Take Away Orders for website and APP</p>
            <h1>Terms And Conditions</h1>
            <p>1. This Coupon code can be applied only once in 2 hours. <br>
                2. Offer Valid on BBK APP and website only. <br>
                3. This offer cannot be clubbed with any other offer. <br>
                4. Offer applicable on min. order amount of Rs 199 & above. <br>
                5. Max discount Rs 3000 per order.</p>

        </div>`

const offerX = document.getElementById("offer_x");
offerX.addEventListener("click", menu)
}

function showCartPage() {
    let cartHtml = "";
    if (cart.length === 0) {
        cartHtml = `
        <div style="max-width: 600px; margin: 10vh auto; padding: 40px; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); text-align: center; font-family: inherit; color: black;">
            <div style="font-size: 70px; color: #FFA608; margin-bottom: 20px;">🛒</div>
            <h1 style="font-size: 28px; font-weight: bold; color: #880203; margin-bottom: 10px;">Your Cart is Empty</h1>
            <p style="color: grey; font-size: 16px; margin-bottom: 30px; line-height: 22px;">You haven't added any delicacies to your cart yet. Explore our Royal Menu or craft your own plate in the Chef's Lab!</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <button id="cart_go_menu_btn" style="background: #FFA608; border: none; padding: 12px 30px; border-radius: 25px; color: white; font-weight: bold; cursor: pointer; transition: background 0.2s;">Browse Menu</button>
                <button id="cart_go_home_btn" style="background: #880203; border: none; padding: 12px 30px; border-radius: 25px; color: white; font-weight: bold; cursor: pointer; transition: background 0.2s;">Chef's Lab Home</button>
            </div>
        </div>
        `;
        document.querySelector(".js_root").innerHTML = cartHtml + footer();
        
        document.getElementById("cart_go_menu_btn").addEventListener("click", menu);
        document.getElementById("cart_go_home_btn").addEventListener("click", landingpage);
        return;
    }

    let subtotal = 0;
    let itemsHtml = "";
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        itemsHtml += `
        <div style="display: flex; gap: 15px; align-items: center; border-bottom: 1px solid #eee; padding: 15px 0; flex-wrap: wrap;">
            <img src="${item.image}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px;" alt="${item.name}">
            <div style="flex: 1; min-width: 150px;">
                <h3 style="margin: 0; color: black; font-size: 16px; font-weight: bold;">${item.name}</h3>
                ${item.desc ? `<p style="margin: 4px 0 0 0; color: #777; font-size: 12px; line-height: 14px;">${item.desc}</p>` : ""}
                <p style="margin: 4px 0 0 0; color: #880203; font-weight: bold; font-size: 14px;">$${item.price.toFixed(2)} each</p>
            </div>
            
            <div style="display: flex; align-items: center; gap: 8px; background: #f5f5f5; border-radius: 20px; padding: 4px 10px;">
                <button class="qty_dec_btn" data-index="${index}" style="border: none; background: none; font-size: 18px; cursor: pointer; color: #555; width: 24px; height: 24px;">-</button>
                <span style="font-weight: bold; font-size: 14px; width: 20px; text-align: center; color: black;">${item.qty}</span>
                <button class="qty_inc_btn" data-index="${index}" style="border: none; background: none; font-size: 16px; cursor: pointer; color: #555; width: 24px; height: 24px;">+</button>
            </div>
            
            <div style="text-align: right; min-width: 80px;">
                <p style="margin: 0; font-weight: bold; font-size: 16px; color: black;">$${itemTotal.toFixed(2)}</p>
                <button class="item_remove_btn" data-index="${index}" style="border: none; background: none; color: red; font-size: 12px; cursor: pointer; margin-top: 5px; padding: 0;"><i class="fa fa-trash"></i> Remove</button>
            </div>
        </div>
        `;
    });

    let gst = subtotal * 0.18;
    let delivery = subtotal > 15 ? 0 : 3;
    let grandTotal = subtotal + gst + delivery;

    cartHtml = `
    <div class="cart_page_outer" style="max-width: 1100px; margin: 40px auto; padding: 20px; font-family: inherit; color: black;">
        <h1 style="color: #880203; font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 30px;"><i class="fa fa-shopping-cart"></i> Your Royal Cart</h1>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;" class="cart_grid_responsive">
            <div style="background: white; border-radius: 20px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                <h2 style="font-size: 20px; font-weight: bold; border-bottom: 2px solid #FFA608; padding-bottom: 10px; margin-bottom: 15px; color: black;">Selected Delicacies</h2>
                <div style="display: flex; flex-direction: column;">
                    ${itemsHtml}
                </div>
                
                <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                    <button id="cart_keep_shopping_btn" style="background: none; border: 2px solid #FFA608; padding: 10px 20px; border-radius: 25px; color: #FFA608; font-weight: bold; cursor: pointer;"><i class="fa fa-arrow-left"></i> Keep Customizing</button>
                    <button id="cart_clear_all_btn" style="background: none; border: 1px solid #ccc; padding: 8px 16px; border-radius: 20px; color: #777; cursor: pointer;">Clear Cart</button>
                </div>
            </div>
            
            <div style="background: white; border-radius: 20px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); display: flex; flex-direction: column; justify-content: space-between; height: fit-content;">
                <div>
                    <h2 style="font-size: 20px; font-weight: bold; border-bottom: 2px solid #880203; padding-bottom: 10px; margin-bottom: 15px; color: black;">Order Summary</h2>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                        <span style="color: grey;">Subtotal:</span>
                        <span style="font-weight: bold; color: black;">$${subtotal.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                        <span style="color: grey;">GST / Taxes (18%):</span>
                        <span style="font-weight: bold; color: black;">$${gst.toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;">
                        <span style="color: grey;">Delivery Fee:</span>
                        <span style="font-weight: bold; color: black;">${delivery === 0 ? `<span style="color: green;">FREE</span>` : `$${delivery.toFixed(2)}`}</span>
                    </div>
                    
                    ${delivery > 0 ? `<p style="font-size: 11px; color: #FFA608; margin-top: -6px; margin-bottom: 12px; line-height:13px;">💡 Add $${(15 - subtotal).toFixed(2)} more to unlock <strong>FREE Delivery!</strong></p>` : ""}
                    
                    <div style="height: 1px; background: #ddd; margin: 15px 0;"></div>
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #880203; margin-bottom: 20px;">
                        <span>Grand Total:</span>
                        <span>$${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    <button id="cart_to_table_btn" style="background: #880203; border: none; padding: 14px; border-radius: 12px; color: white; font-weight: bold; cursor: pointer; text-align: center; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fa fa-chair"></i> Book Royal Table First (₹100/chair)
                    </button>
                    <button id="cart_checkout_pay_btn" style="background: #FFA608; border: none; padding: 14px; border-radius: 12px; color: white; font-weight: bold; cursor: pointer; text-align: center; font-size: 15px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <i class="fa fa-credit-card"></i> Pay & Checkout Instantly
                    </button>
                </div>
            </div>
        </div>
    </div>
    ` + footer();

    document.querySelector(".js_root").innerHTML = cartHtml;

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
        @media (max-width: 768px) {
            .cart_grid_responsive {
                grid-template-columns: 1fr !important;
            }
        }
    `;
    document.querySelector(".js_root").appendChild(styleEl);

    document.getElementById("cart_keep_shopping_btn").addEventListener("click", landingpage);
    document.getElementById("cart_clear_all_btn").addEventListener("click", () => {
        cart = [];
        updateCartBadge();
        showCartPage();
        showToast("Cart cleared.");
    });

    document.getElementById("cart_to_table_btn").addEventListener("click", tableBook);
    document.getElementById("cart_checkout_pay_btn").addEventListener("click", () => {
        showCheckoutPage(grandTotal);
    });

    document.querySelectorAll(".qty_inc_btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number(e.target.getAttribute("data-index"));
            cart[index].qty++;
            updateCartBadge();
            showCartPage();
        });
    });

    document.querySelectorAll(".qty_dec_btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number(e.target.getAttribute("data-index"));
            if (cart[index].qty > 1) {
                cart[index].qty--;
            } else {
                cart.splice(index, 1);
            }
            updateCartBadge();
            showCartPage();
        });
    });

    document.querySelectorAll(".item_remove_btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number(e.target.closest("button").getAttribute("data-index"));
            const removedName = cart[index].name;
            cart.splice(index, 1);
            updateCartBadge();
            showCartPage();
            showToast(`"${removedName}" removed from cart.`);
        });
    });
}

function showCheckoutPage(totalAmount) {
    if (!currentUser) {
        showToast("Please register/login before checking out!");
        loginButton();
        return;
    }

    document.querySelector(".js_root").innerHTML = `
    <div style="max-width: 600px; margin: 5vh auto; padding: 30px; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); font-family: inherit; color: black;">
        <h1 style="color: #880203; text-align: center; font-size: 24px; margin-bottom: 25px; font-weight: bold;"><i class="fa fa-credit-card"></i> Royal Payment Gateway</h1>
        
        <div style="background: #FFFCEB; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 1px dashed #FFA608; text-align: center;">
            <span style="font-size: 13px; color: grey;">Amount to Pay:</span>
            <h2 style="font-size: 32px; font-weight: bold; color: #880203; margin: 4px 0;">$${totalAmount.toFixed(2)}</h2>
            <span style="font-size: 11px; color: green; font-weight: bold;">🔑 Secure SSL Encrypted Connection</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 15px;">
            <div style="border: 2px solid #FFA608; border-radius: 12px; padding: 15px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: bold; margin-bottom: 10px;">
                    <input type="radio" name="pay_method" value="UPI" checked style="accent-color: #FFA608;">
                    <span>UPI Payment (PhonePe, GooglePay, Paytm)</span>
                </label>
                <div id="upi_input_section">
                    <input type="text" id="upi_id_input" placeholder="enter-your-id@ybl" style="width: 100%; padding: 10px 15px; border: 1px solid #ccc; border-radius: 8px; color: black; font-weight: bold;">
                </div>
            </div>

            <div style="border: 1px solid #ddd; border-radius: 12px; padding: 15px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: bold; margin-bottom: 10px;">
                    <input type="radio" name="pay_method" value="CARD" style="accent-color: #FFA608;">
                    <span>Credit / Debit Card</span>
                </label>
                <div id="card_input_section" style="display: none; flex-direction: column; gap: 10px;">
                    <input type="text" id="card_num_input" placeholder="XXXX XXXX XXXX 8198" style="width: 100%; padding: 10px 15px; border: 1px solid #ccc; border-radius: 8px; color: black;">
                    <div style="display: flex; gap: 10px;">
                        <input type="text" placeholder="MM/YY" style="width: 50%; padding: 10px 15px; border: 1px solid #ccc; border-radius: 8px; color: black;">
                        <input type="password" placeholder="CVV" style="width: 50%; padding: 10px 15px; border: 1px solid #ccc; border-radius: 8px; color: black;">
                    </div>
                </div>
            </div>
            
            <div style="border: 1px solid #ddd; border-radius: 12px; padding: 15px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: bold;">
                    <input type="radio" name="pay_method" value="COD" style="accent-color: #FFA608;">
                    <span>Cash on Delivery (COD)</span>
                </label>
            </div>
        </div>

        <button id="pay_now_submit_btn" style="width: 100%; background: #FFA608; border: none; padding: 14px; border-radius: 12px; color: white; font-weight: bold; font-size: 16px; margin-top: 25px; cursor: pointer;">
            Confirm Payment of $${totalAmount.toFixed(2)}
        </button>
    </div>
    ` + footer();

    const payMethods = document.querySelectorAll('input[name="pay_method"]');
    const upiSec = document.getElementById("upi_input_section");
    const cardSec = document.getElementById("card_input_section");

    payMethods.forEach(method => {
        method.addEventListener("change", (e) => {
            const val = e.target.value;
            if (val === "UPI") {
                upiSec.style.display = "block";
                cardSec.style.display = "none";
            } else if (val === "CARD") {
                upiSec.style.display = "none";
                cardSec.style.display = "flex";
            } else {
                upiSec.style.display = "none";
                cardSec.style.display = "none";
            }
        });
    });

    document.getElementById("pay_now_submit_btn").addEventListener("click", () => {
        const activeMethod = document.querySelector('input[name="pay_method"]:checked').value;
        if (activeMethod === "UPI") {
            const upiId = document.getElementById("upi_id_input").value.trim();
            if (upiId === "") {
                showToast("Please enter a valid UPI ID!");
                return;
            }
        }
        generateInvoice(totalAmount, activeMethod);
    });
}

function generateInvoice(totalAmount, paymentMethod) {
    let invoiceId = "BBK-" + Math.floor(Math.random() * 900000 + 100000);
    let today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    let itemsSummaryHtml = "";
    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        itemsSummaryHtml += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: black;">
            <span>${item.qty}x ${item.name}</span>
            <span style="font-weight: bold;">$${itemTotal.toFixed(2)}</span>
        </div>
        ${item.desc ? `<p style="margin: -4px 0 8px 0; color: #777; font-size: 11px; line-height: 13px;">${item.desc}</p>` : ""}
        `;
    });

    document.querySelector(".js_root").innerHTML = `
    <div style="max-width: 500px; margin: 5vh auto; padding: 35px; background: #fffbeb; border: 2px solid #FFA608; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); font-family: 'Courier New', Courier, monospace; color: black; position: relative;">
        <div style="position: absolute; top: 15px; right: 15px; border: 3px double green; color: green; font-weight: bold; padding: 5px 12px; border-radius: 6px; transform: rotate(15deg); font-size: 15px; letter-spacing: 1px;">
            PAID SUCCESS
        </div>

        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="font-weight: bold; color: #880203; font-size: 22px; margin: 0;">BHAI'S BIRYANI</h2>
            <p style="font-size: 11px; color: grey; margin: 4px 0 0 0;">Royal Dum Biryani & Kebabs Est. 2026</p>
            <p style="font-size: 11px; color: grey; margin: 2px 0 0 0;">12, Royal Plaza, Hyderabad, India</p>
        </div>

        <div style="border-bottom: 1px dashed #FFA608; margin-bottom: 15px; padding-bottom: 10px; font-size: 12px; line-height: 16px;">
            <div><strong>Invoice No:</strong> ${invoiceId}</div>
            <div><strong>Date:</strong> ${today}</div>
            <div><strong>Customer Name:</strong> ${currentUser || "Royal Guest"}</div>
            <div><strong>Payment Method:</strong> ${paymentMethod}</div>
        </div>

        <h3 style="font-size: 14px; font-weight: bold; border-bottom: 1px dashed #FFA608; padding-bottom: 5px; margin-bottom: 12px;">ORDER ITEMS</h3>
        
        <div style="min-height: 100px;">
            ${itemsSummaryHtml}
        </div>

        <div style="border-top: 1px dashed #FFA608; margin-top: 15px; padding-top: 10px; font-size: 12px; line-height: 18px;">
            <div style="display: flex; justify-content: space-between;">
                <span>Subtotal:</span>
                <span>$${(totalAmount / 1.18 - (totalAmount > 15 ? 0 : 3)).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>Taxes & GST (18%):</span>
                <span>$${((totalAmount / 1.18 - (totalAmount > 15 ? 0 : 3)) * 0.18).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>Delivery:</span>
                <span>${totalAmount > 15 ? "FREE" : "$3.00"}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #880203; border-top: 1px solid #ccc; padding-top: 8px;">
                <span>GRAND TOTAL:</span>
                <span>$${totalAmount.toFixed(2)}</span>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; border-top: 2px dashed #FFA608; padding-top: 15px;">
            <p style="font-weight: bold; font-size: 12px; color: #880203; margin: 0;">THANK YOU FOR DINING ROYALLY!</p>
            <p style="font-size: 10px; color: grey; margin: 4px 0 0 0;">Your delicious order is being hand-cooked by our chefs and will reach your doorstep shortly.</p>
            
            <button id="invoice_home_back_btn" style="background: #FFA608; border: none; padding: 10px 20px; border-radius: 20px; color: white; font-weight: bold; font-family: sans-serif; cursor: pointer; margin-top: 15px; width: 100%;">
                Back to Home Page
            </button>
        </div>
    </div>
    ` + footer();

    cart = [];
    updateCartBadge();

    document.getElementById("invoice_home_back_btn").addEventListener("click", landingpage);
}


//3rd page TABLE/CHAIR SELECTING
const book_table = document.querySelector(".table_book")

function tableBook(){
    document.querySelector(".js_root").innerHTML=`
    <div class="payment_div">

        <div class="payment_content_div">

            <div class="upis_div">
                <img src="./imgs/upi.png" alt="">
                <input type="text" placeholder="Enter UPI ID">
            </div>

            <div class="debit_cards_div">Debit Card</div>

            <div class="credit_card_box_div">
                <div class="credit_cards_div_1">cedit Card</div>
                <div class="credit_cards_div_2"><img src="./imgs/card.png" alt=""><h3>XXXX XX73 8198</h3></div>
                <div class="credit_cards_div_3">Add Cards +</div>
            </div>

            <button id="payment_button">Confirm</button>

        </div>

    </div>
          <div class="table_booking_div">
  
            <div class="table_content_1">

                <div class="colour_know_div">
                    <div class="colour_know_1"></div>
                    <h1>Available</h1>
                    <div class="colour_know_2"></div>
                    <h1>Booked</h1>
                </div>

                <div class="after_selecting_table_div">
                    <h3>Each Chair Cost ₹100</h3> 

                </div>

            </div>


            <div class="table_content_2">  

                <div class="table_div">  
                    
                    <div class="table table_1">
                        <div class="chair_1"></div>
                        <div class="chair_2"></div>
                        <i id="user1" class="fa-solid fa-user" style="color: #000000;">2</i>
                        <h3>Table 1</h3>
                    </div>

                    <div class="table table_2">
                        <div class="chair_1 chair_11"></div>
                        <div class="chair_2 chair_22"></div>
                        <i id="user1" class="fa-solid fa-user" style="color: #000000;">2</i>
                        <h3>Table 2</h3>
                    </div>

                    <div class="table table_3">
                        <div class="chair_1"></div>
                        <div class="chair_2"></div>
                        <div class="chair_3"></div>
                        <h3>Table 3</h3>
                        <i id="user2" class="fa-solid fa-user" style="color: #000000;">3</i>
                    </div>

                    <div class="table table_4">
                        <div class="chair_1"></div>
                        <div class="chair_2"></div>
                        <div class="chair_3 chair_33"></div>
                        <h3>Table 4</h3>
                        <i id="user2" class="fa-solid fa-user" style="color: #000000;">3</i>
                    </div> 

                    <div class="table table_5">
                        <div class="chair_1"></div>
                        <div class="chair_2"></div>
                        <div class="chair_3 chair_333"></div>
                        <div class="chair_4 chair_44"></div>
                        <i id="user3" class="fa-solid fa-user" style="color: #000000;">4</i>
                        <h3>Table 5</h3>
                    </div>

                    <div class="table table_6">
                        <div class="chair_1"></div>
                        <div class="chair_2"></div>
                        <div class="chair_3"></div>
                        <div class="chair_4"></div>
                        <i id="user3" class="fa-solid fa-user" style="color: #000000;">4</i>
                        <h3>Table 6</h3>
                    </div>  

                </div> 

                <button>Confirm</button>

            </div>
        </div> 
 `

    let chair1 = document.querySelector(".chair_1");
    let chair2 = document.querySelector(".chair_2");
    let chair3 = document.querySelector(".chair_3");
    let chair4 = document.querySelector(".chair_4");
    let chair11 = document.querySelector(".chair_11");
    let chair22 = document.querySelector(".chair_22");
    let chair33 = document.querySelector(".chair_33");
    let chair333 = document.querySelector(".chair_333");
    let chair44 = document.querySelector(".chair_44");
    let chair444 = document.querySelector(".chair_444");

    if (chair1) chair1.addEventListener("click", () => {
        chair1.style.backgroundColor = "greenyellow";
        toShowBill();
    });
    if (chair2) chair2.addEventListener("click", () => {
        chair2.style.backgroundColor = "greenyellow";
        secondChair();
    });
    if (chair3) chair3.addEventListener("click", () => {
        chair3.style.backgroundColor = "greenyellow";
        toShowBill();
    });
    if (chair4) chair4.addEventListener("click", () => {
        chair4.style.backgroundColor = "greenyellow";
        toShowBill();
    });
    if (chair11) chair11.addEventListener("click", toShowBill);
    if (chair22) chair22.addEventListener("click", secondChair);
    if (chair33) chair33.addEventListener("click", toShowBill);
    if (chair333) chair333.addEventListener("click", toShowBill);
    if (chair44) chair44.addEventListener("click", toShowBill);
    if (chair444) chair444.addEventListener("click", toShowBill);

    let chair_one = 100;
    let chair_two = 100;
    let chair_three = 100;
    let chair_four = 100;

    let chair_div = document.querySelector(".after_selecting_table_div");
    
    function toShowBill(){
        if (!chair_div) return;
        chair_div.innerHTML=` <h3>Each Chair Cost ₹100</h3>
                              <div class="selected_table">
                                  <h4>TABLE 1</h4>
                                  <p id="chairs_count">ID 2002278, chair 1</p>
                                  <h2>${currentUser || "JHON DHURAI"}</h2>
                                  <h2 id="rs">₹</h2>
                                  <h2 id="chair_cost">${chair_one}</h2>

                                  <div id="nav_div" class="nav_div_1 table_logo">
                                      <img class="logo" src="./imgs/logo.png" alt="">
                                      <h1 id="logo_text">Bhai <br> Briyani</h1>
                                  </div>
          
                                  <button id="bill_button">Make a Payment</button>
                              </div>`;

        const bill_button = document.getElementById("bill_button");
        if (bill_button) {
            bill_button.addEventListener("click", payment);
        }
    }

    function payment(){
        const payment_div = document.querySelector(".payment_div");
        const table_booking_div = document.querySelector(".table_booking_div");
        if (payment_div) payment_div.style.zIndex = "1";
        if (table_booking_div) table_booking_div.style.opacity = "0.5";
    }

    function secondChair(){
        let chair_cost = document.getElementById("chair_cost");
        if (chair_cost) {
            if (chair_cost.innerText == `${chair_one}`) {
                chair_cost.innerText = chair_one + chair_two;
                const cc = document.getElementById("chairs_count");
                if (cc) cc.innerText = "ID 2002279, chair 2";
            }
        }
    }

    const payment_button = document.getElementById("payment_button");
    if (payment_button) {
        payment_button.addEventListener("click", () => {
            showToast("Table reserved successfully!");
            landingpage();
        });
    }
}
book_table.addEventListener("click", tableBook)


//4th page outlet
const outlet = document.querySelector(".outlet")

function outlets(){
    document.querySelector(".js_root").innerHTML=`
     
  <!-- ------------------------- PROFILE YELLO BOX  --------------------------- -->
  
         <div class="profile_div">
             <div class="profile_circle"><i class="fa-regular fa-circle-user profile_pic" style="color: #000000;"></i></div>
             <div id="user">
                 <h1>User 1</h1>
                 <a href=""> <h5>Edit Profile</h5> </a>
             </div>
         </div>
  
  <!-- ------------------------- LOCATION INPUT DIV --------------------------- -->
  
         <div class="location_div">
             <div class="location_input_div">
                 <input type="text" placeholder="Store Location">
                 <h5>Bhai Briyani - Outlets</h5>
             </div>
         </div>
  
         <div class="white_box">
             <div class="red_box">All-Store</div>
             <h5>Nearby stores ---- Dine in stores </h5>
         </div>
  
  <!-- ------------------------ TABLE BOOK DIV ------------------------- -->
  
         <div class="table_book_div">
  
                 <div class="table_box table_box_1">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button id="map_butt">Get Direction</button>
                     </div>
                     
                 </div>
  
  
                 <div class="table_box table_box_2">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
  
  
                 <div class="table_box table_box_3">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
  
  
                 <div class="table_box table_box_4">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
  
  
                 <div class="table_box table_box_5">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
  
  
                 <div class="table_box table_box_6">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
  
                 <div class="table_box table_box_6">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
  
                 <div class="table_box table_box_6">
                     <div id="nav_div" class="nav_div_1">
                         <img class="logo" src="./imgs/logo.png" alt="">
                         <h1 id="logo_text">Bhai <br> Briyani</h1>
                     </div>
                     <div id="table_box_content">
                         <h2>Bhai Briyani - Chennai</h2>
                         <h4>10 am to 5pm</h4>
                         <button id="table_section">Book A Table</button>
                         <button>Get Direction</button>
                     </div>
                 </div>
         </div>`+footer()

         const table_section = document.getElementById("table_section")
         const map_butt = document.getElementById("map_butt")
         table_section.addEventListener("click", tableBook)
         map_butt.addEventListener("click", ()=>{
            document.querySelector(".js_root").innerHTML=`<div class="title">
            <h1>Direction</h1>
        </div>
        <div class="map_div">
            <img src="./page2 imgs/map.png" alt="">
        </div>`
         })
}
outlet.addEventListener("click", outlets)
