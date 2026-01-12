const indianStatesAndCities = {
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Bhismaknagar", "Pasighat", "Ziro", "Bomdila"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    "Chandigarh": ["Chandigarh"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Gandhidham", "Anand"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Baddi", "Nahan"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur"],
    "Jharkhand": ["Jamshedpur", "Dhanbad", "Ranchi", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davangere", "Ballari", "Vijayapura", "Shivamogga"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Kannur", "Alappuzha", "Palakkad", "Malappuram", "Manjeri"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Mira-Bhayandar", "Bhiwandi", "Amravati", "Nanded", "Kolhapur", "Akola", "Ulhasnagar", "Sangli-Miraj & Kupwad", "Malegaon", "Jalgaon", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambarnath", "Bhusawal", "Panvel", "Badlapur", "Beed", "Gondia", "Satara", "Barshi", "Yavatmal", "Achalpur", "Osmanabad", "Nandurbar", "Wardha", "Udgir", "Hinganghat"],
    "Manipur": ["Imphal", "Thoubal", "Kakching", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada"],
    "Puducherry": ["Puducherry", "Karaikal", "Yanam", "Mahe"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Tiruppur", "Salem", "Erode", "Tirunelveli", "Vellore", "Thoothukudi"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Ayodhya", "Rampur", "Shahjahanpur"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur"]
};

const cityAreas = {
    "Pune": [
        "Pimpri-Chinchwad", "Hinjewadi", "Wakad", "Baner", "Kothrud",
        "Hadapsar", "Shivajinagar", "Swargate", "Yerwada", "Koregaon Park",
        "Viman Nagar", "Magarpatta", "Aundh", "FC Road", "JM Road"
    ],
    "Mumbai": [
        "Andheri", "Bandra", "Juhu", "Dadar", "Colaba", "Borivali",
        "Goregaon", "Powai", "Chembur", "Navi Mumbai"
    ],
    "Nagpur": ["Sitabuldi", "Dharampeth", "Sadar", "Mahal", "Itwari"],
    "Nashik": ["Panchavati", "Satpur", "Indira Nagar", "Nashik Road"],
    "Aurangabad": ["Cidco", "Garkheda", "Shahaganj"],
    "Bangalore": ["Koramangala", "Indiranagar", "Whitefield", "Jayanagar"]
};
