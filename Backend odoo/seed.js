const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect("mongodb://localhost:27017/Odoo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Policy = mongoose.model("Policy", new mongoose.Schema({
    // id: Number,
    // title: String,
    // description: String,
    // date: String,
    // source: String,
    // image: String,
    // category: String,

    id: Number,
    category: String,
    title: String,
    title_hi: String,
    description: String,
    description_hi: String,
    date: String,
    source: String,
    image: String,

}));

const policies = {
    central:
    [
    {  id: 1,
    category: "central",
    title: "Women's Reservation Bill 2023",
    title_hi: "महिला आरक्षण विधेयक 2023",
    description: "A bill to reserve 33% of seats in Lok Sabha and state assemblies for women.",
    description_hi: "लोकसभा और राज्य विधानसभाओं में महिलाओं के लिए 33% सीटें आरक्षित करने का विधेयक।",
    date: "2023-09-20",
    source: "https://www.india.gov.in/womens-reservation-bill",
    image: "https://example.com/images/ev-policy.jpg"
    },
    {
        "id": 2,
        "category": "central",
        "title": "EV Policy 2025",
        "title_hi": "ईवी नीति 2025",
        "description": "Government introduces new investment caps for EV infrastructure.",
        "description_hi": "सरकार ईवी अवसंरचना के लिए नए निवेश सीमा की घोषणा करती है।",
        "date": "2025-02-21",
        "source": "https://powermin.gov.in/ev-policy",
        "image": "https://example.com/images/ev-policy.jpg"
    },
    {
        "id": 3,
        "category": "central",
        "title": "Solar Energy Mandate 2024",
        "title_hi": "सौर ऊर्जा अनिवार्यता 2024",
        "description": "India mandates the use of locally made solar cells in energy projects.",
        "description_hi": "भारत ऊर्जा परियोजनाओं में स्थानीय रूप से निर्मित सौर सेल के उपयोग को अनिवार्य करता है।",
        "date": "2024-12-10",
        "source": "https://mnre.gov.in/solar-energy-policy",
        "image": "https://example.com/images/solar-energy.jpg"
    },
    {
        "id": 4,
        "category": "central",
        "title": "National Digital Health Mission",
        "title_hi": "राष्ट्रीय डिजिटल स्वास्थ्य मिशन",
        "description": "Creation of a digital health ecosystem for easy access to medical records.",
        "description_hi": "मेडिकल रिकॉर्ड तक आसान पहुंच के लिए एक डिजिटल स्वास्थ्य पारिस्थितिकी तंत्र का निर्माण।",
        "date": "2023-11-15",
        "source": "https://ndhm.gov.in/",
        "image": "https://example.com/images/digital-health.jpg"
    },
    {
        "id": 5,
        "category": "central",
        "title": "Aatmanirbhar Bharat Initiative",
        "title_hi": "आत्मनिर्भर भारत पहल",
        "description": "A self-reliant India campaign to boost local manufacturing and industries.",
        "description_hi": "स्थानीय विनिर्माण और उद्योगों को बढ़ावा देने के लिए आत्मनिर्भर भारत अभियान।",
        "date": "2024-01-10",
        "source": "https://aatmanirbharbharat.mygov.in/",
        "image": "https://example.com/images/aatmanirbhar.jpg"
    },
    {
        "id": 6,
        "category": "central",
        "title": "Make in India Initiative",
        "title_hi": "मेक इन इंडिया पहल",
        "description": "Promoting local manufacturing and reducing dependency on imports.",
        "description_hi": "स्थानीय विनिर्माण को बढ़ावा देना और आयात पर निर्भरता कम करना।",
        "date": "2024-02-15",
        "source": "https://makeinindia.com/",
        "image": "https://example.com/images/make-in-india.jpg"
    },
    {
        "id": 7,
        "category": "central",
        "title": "Digital India Program",
        "title_hi": "डिजिटल इंडिया कार्यक्रम",
        "description": "Expanding digital infrastructure and e-governance.",
        "description_hi": "डिजिटल अवसंरचना और ई-गवर्नेंस का विस्तार।",
        "date": "2024-03-10",
        "source": "https://digitalindia.gov.in/",
        "image": "https://example.com/images/digital-india.jpg"
    },
    {
        "id": 8,
        "category": "central",
        "title": "Startup India Scheme",
        "title_hi": "स्टार्टअप इंडिया योजना",
        "description": "Boosting entrepreneurship through tax benefits and funding support.",
        "description_hi": "कर लाभ और वित्तीय सहायता के माध्यम से उद्यमिता को बढ़ावा देना।",
        "date": "2024-04-05",
        "source": "https://www.startupindia.gov.in/",
        "image": "https://example.com/images/startup-india.jpg"
    },
    {
        "id": 9,
        "category": "central",
        "title": "Smart Cities Mission",
        "title_hi": "स्मार्ट सिटीज़ मिशन",
        "description": "Developing smart and sustainable cities in India.",
        "description_hi": "भारत में स्मार्ट और सतत शहरों का विकास।",
        "date": "2024-05-18",
        "source": "https://smartcities.gov.in/",
        "image": "https://example.com/images/smart-cities.jpg"
    },
    {
        "id": 10,
        "category": "central",
        "title": "PM Kisan Samman Nidhi",
        "title_hi": "पीएम किसान सम्मान निधि",
        "description": "Financial assistance to farmers across India.",
        "description_hi": "भारत के किसानों को वित्तीय सहायता।",
        "date": "2024-06-12",
        "source": "https://pmkisan.gov.in/",
        "image": "https://example.com/images/pm-kisan.jpg"
    },
    {
        "id": 11,
        "category": "central",
        "title": "Jal Jeevan Mission",
        "title_hi": "जल जीवन मिशन",
        "description": "Ensuring tap water connections to all rural households.",
        "description_hi": "सभी ग्रामीण घरों में नल जल कनेक्शन सुनिश्चित करना।",
        "date": "2024-07-08",
        "source": "https://jaljeevanmission.gov.in/",
        "image": "https://example.com/images/jal-jeevan.jpg"
    },
    {
        "id": 12,
        "category": "central",
        "title": "Skill India Initiative",
        "title_hi": "स्किल इंडिया पहल",
        "description": "Providing vocational training to enhance employment opportunities.",
        "description_hi": "रोजगार के अवसरों को बढ़ाने के लिए व्यावसायिक प्रशिक्षण प्रदान करना।",
        "date": "2024-08-10",
        "source": "https://www.skillindia.gov.in/",
        "image": "https://example.com/images/skill-india.jpg"
    },
    {
        "id": 13,
        "category": "central",
        "title": "Ayushman Bharat Yojana",
        "title_hi": "आयुष्मान भारत योजना",
        "description": "Providing free healthcare to underprivileged families.",
        "description_hi": "वंचित परिवारों को मुफ्त स्वास्थ्य सेवा प्रदान करना।",
        "date": "2024-09-05",
        "source": "https://pmjay.gov.in/",
        "image": "https://example.com/images/ayushman-bharat.jpg"
    },
    {
        "id": 14,
        "category": "central",
        "title": "Swachh Bharat Abhiyan",
        "title_hi": "स्वच्छ भारत अभियान",
        "description": "A nationwide campaign for a cleaner India.",
        "description_hi": "एक स्वच्छ भारत के लिए राष्ट्रव्यापी अभियान।",
        "date": "2024-10-12",
        "source": "https://swachhbharat.mygov.in/",
        "image": "https://example.com/images/swachh-bharat.jpg"
    },
    {
        "id": 15,
        "category": "central",
        "title": "Beti Bachao Beti Padhao",
        "title_hi": "बेटी बचाओ बेटी पढ़ाओ",
        "description": "Promoting education and welfare for girls.",
        "description_hi": "लड़कियों की शिक्षा और कल्याण को बढ़ावा देना।",
        "date": "2024-11-20",
        "source": "https://wcd.nic.in/bbbp/",
        "image": "https://example.com/images/beti-bachao.jpg"
    }
    ],

    state:
    [
        {
            "id": 17,
            "category": "state",
            "title": "Tamil Nadu Green Energy Corridor",
            "title_hi": "तमिलनाडु ग्रीन एनर्जी कॉरिडोर",
            "description": "Promoting renewable energy infrastructure in the state.",
            "description_hi": "राज्य में नवीकरणीय ऊर्जा अवसंरचना को बढ़ावा देना।",
            "date": "2024-02-15",
            "source": "https://www.tn.gov.in/green-energy",
            "image": "https://example.com/images/tn-green-energy.jpg"
        },
        {
            "id": 18,
            "category": "state",
            "title": "Maharashtra Agribusiness Policy",
            "title_hi": "महाराष्ट्र कृषि व्यवसाय नीति",
            "description": "Boosting food processing and agribusiness investments.",
            "description_hi": "खाद्य प्रसंस्करण और कृषि व्यवसाय में निवेश को बढ़ावा देना।",
            "date": "2024-03-10",
            "source": "https://www.maharashtra.gov.in/agribusiness",
            "image": "https://example.com/images/maha-agribusiness.jpg"
        },
        {
            "id": 19,
            "category": "state",
            "title": "Kerala Coastal Development Scheme",
            "title_hi": "केरल तटीय विकास योजना",
            "description": "Improving livelihood for coastal communities.",
            "description_hi": "तटीय समुदायों के लिए आजीविका में सुधार।",
            "date": "2024-04-12",
            "source": "https://kerala.gov.in/coastal-development",
            "image": "https://example.com/images/kerala-coastal.jpg"
        },
        {
            "id": 20,
            "category": "state",
            "title": "Gujarat Industrial Corridor",
            "title_hi": "गुजरात औद्योगिक कॉरिडोर",
            "description": "Boosting industrial growth and smart cities.",
            "description_hi": "औद्योगिक विकास और स्मार्ट शहरों को बढ़ावा देना।",
            "date": "2024-05-18",
            "source": "https://gujarat.gov.in/industrial-corridor",
            "image": "https://example.com/images/gujarat-industrial.jpg"
        },
        {
            "id": 21,
            "category": "state",
            "title": "Karnataka Startup Policy",
            "title_hi": "कर्नाटक स्टार्टअप नीति",
            "description": "Encouraging innovation and entrepreneurship in Karnataka.",
            "description_hi": "कर्नाटक में नवाचार और उद्यमशीलता को प्रोत्साहित करना।",
            "date": "2024-06-25",
            "source": "https://karnataka.gov.in/startup-policy",
            "image": "https://example.com/images/karnataka-startup.jpg"
        },
        {
            "id": 22,
            "category": "state",
            "title": "Rajasthan Tourism Promotion Scheme",
            "title_hi": "राजस्थान पर्यटन संवर्धन योजना",
            "description": "Boosting tourism and heritage conservation.",
            "description_hi": "पर्यटन और विरासत संरक्षण को बढ़ावा देना।",
            "date": "2024-07-10",
            "source": "https://rajasthan.gov.in/tourism",
            "image": "https://example.com/images/rajasthan-tourism.jpg"
        },
        {
            "id": 23,
            "category": "state",
            "title": "Punjab Agri Export Policy",
            "title_hi": "पंजाब कृषि निर्यात नीति",
            "description": "Enhancing agricultural exports and farmer income.",
            "description_hi": "कृषि निर्यात और किसानों की आय को बढ़ाना।",
            "date": "2024-08-05",
            "source": "https://punjab.gov.in/agri-export",
            "image": "https://example.com/images/punjab-agri.jpg"
        },
        {
            "id": 24,
            "category": "state",
            "title": "West Bengal Smart City Plan",
            "title_hi": "पश्चिम बंगाल स्मार्ट सिटी योजना",
            "description": "Developing smart cities and urban infrastructure.",
            "description_hi": "स्मार्ट शहरों और शहरी अवसंरचना का विकास।",
            "date": "2024-09-15",
            "source": "https://westbengal.gov.in/smart-city",
            "image": "https://example.com/images/wb-smart-city.jpg"
        }
    ]
    
};

Policy.insertMany([...policies.central, ...policies.state])
    .then(() => {
        console.log("Policies added successfully");
        mongoose.connection.close();
    })
    .catch((err) => console.error(err));

