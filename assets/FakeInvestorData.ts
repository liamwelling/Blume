
// type FakeInvestorData = object;
// let FakeInvestorData: {
//   name: string;
//   strategy: string;
// }
// const FakeInvestorData = [

//   {
//     name:"Betty Murphy",
//     "strategy":"My protfolio is optimized to balance risk and balance. It is set up to outperform any downturn of the markets and mitigate losses during a recession. I have done this by collecting dissimilar stocks that I believe are currently at a low valuation through technical and comparative analysis. Thus, spreading risk and increasing potential growth of this portfolio",
//     "risk":"A-",
//     "price" : "20.00",
//     "bio": "As a computer science and data scientist I have spent the last 5 years working to implement data and AI into my decision-making process for my portfolio. I have seen increasing success year over year as I continue to learn and refine my suggestive algorithm, adjusting for nuances amongst different asset classes and sectors.",
//     // "photo" : require('../Media/Headshots/Betty_Murphy.jpg'),
//     "stocks":[
//       {
//         "company":"Delphi Automotive PLC",
//         "ticker":"APTV",
//         "percentage":4.62772131685107,
//         "type":"Consumer Discresionary"
//       },
//       {
//         "company":"Becton Dickinson",
//         "ticker":"BDX",
//         "percentage":4.08420101233683,
//         "type":"Healthcare"
//       },
//       {
//         "company":"Western Digital",
//         "ticker":"WDC",
//         "percentage":5.45875195146086,
//         "type":"Materials"
//       },
//       {
//         "company":"Honeywell Int'l Inc.",
//         "ticker":"HON",
//         "percentage":1.63862248023288,
//         "type":"Utilities"
//       },
//       {
//         "company":"KeyCorp",
//         "ticker":"KEY",
//         "percentage":2.22320192808033,
//         "type":"Financials"
//       },
//       {
//         "company":"Gilead Sciences",
//         "ticker":"GILD",
//         "percentage":2.99402750328811,
//         "type":"Healthcare"
//       },
//       {
//         "company":"Wyndham Worldwide",
//         "ticker":"WH",
//         "percentage":5.25574650750162,
//         "type":"Real Estate"
//       },
//       {
//         "company":"Bitcoin",
//         "ticker":"BTC",
//         "percentage":6.7,
//         "type":"Crypto",
//         // "icon": require('../Media/Icons/bitcoin-icon-6219383_1280.webp'),
//       },
//       {
//         "company":"Ameren Corp",
//         "ticker":"AEE",
//         "percentage":5.68678782130423,
//         "type":"Energy"
//       },
//       {
//         "company":"Johnson & Johnson",
//         "ticker":"JNJ",
//         "percentage":7.99665147726946,
//         "type":"Healthcare",
//         // "icon": require('../Media/Icons/J&J_LOGO.jpeg'),
//       },
//       {
//         "company":"Zimmer Biomet Holdings",
//         "ticker":"ZBH",
//         "percentage":4.30312780653958,
//         "type":"Materials"
//       },
//       {
//         "company":"Wells Fargo",
//         "ticker":"WFC",
//         "percentage":1.80495955812249,
//         "type":"Financials",
//         // "icon": require('../Media/Icons/WELLSFARGO_ICON.png'),
//       },
//       {
//         "company":"Pulte Homes Inc.",
//         "ticker":"PHM",
//         "percentage":7.01695473755034,
//         "type":"Industrials"
//       },
//       {
//         "company":"Whirlpool Corp.",
//         "ticker":"WHR",
//         "percentage":6.52299277917438,
//         "type":"Materials"
//       },
//       {
//         "company":"Eastman Chemical",
//         "ticker":"EMN",
//         "percentage":4.09763950806622,
//         "type":"Materials"
//       },
//       {
//         "company":"PPL Corp.",
//         "ticker":"PPL",
//         "percentage":7.29998983438861,
//         "type":"Energy"
//       },
//       {
//         "company":"C. H. Robinson Worldwide",
//         "ticker":"CHRW",
//         "percentage":6.52299277917438,
//         "type":"Materials"
//       },
//       {
//         "company":"Welltower Inc",
//         "ticker":"WELL",
//         "percentage":1.96581225655552,
//         "type":"REIT"
//       },
//       {
//         "company":"Coca-Cola Company",
//         "ticker":"KO",
//         "percentage":7.78863594309564,
//         "type":"Consumer Staples"
//       },
//       {
//         "company":"AT&T Inc",
//         "ticker":"T",
//         "percentage":4.83110121343029,
//         "type":"Communication Services"
//       },
//       {
//         "company":"Newfield Exploration Co",
//         "ticker":"NFX",
//         "percentage":7.74591102904626,
//         "type":"Energy"
//       },
//     ]
//   },
// {
//   name: "goose"
// },
// {
// name: "rosy"
// }
// ,
// {name: 'asdf'}]
import headshotImport from "./Headshots/headshotImport";
import IconImport from "./Icons/IconImport";
interface stock {
  company: string;
    ticker: string;
    percentage: number;
    industry: string;
}
// const FakeInvestorData: [{
//   name: string;
//   strategy: string;
//   risk: string;
//   price: string;
//   bio: string;
//   photo: any;
//   stocks:{
//     company: string;
//     ticker: string;
//     percentage: number;
//     industry: string;
//   };
  

// }] 
let FakeInvestorData = [
  
  {
    "id" : 1,
    "name":"Betty Murphy",
    "strategy":"My protfolio is optimized to balance risk and balance. It is set up to outperform any downturn of the markets and mitigate losses during a recession. I have done this by collecting dissimilar stocks that I believe are currently at a low valuation through technical and comparative analysis. Thus, spreading risk and increasing potential growth of this portfolio",
    "risk":"A-",
    "price" : "20.00",
    "bio": "As a computer science and data scientist I have spent the last 5 years working to implement data and AI into my decision-making process for my portfolio. I have seen increasing success year over year as I continue to learn and refine my suggestive algorithm, adjusting for nuances amongst different asset classes and sectors.",
    "photo" : require('./Headshots/Betty_Murphy.jpg'),
    "stocks":[
      {
        "company":"Delphi Automotive PLC",
        "ticker":"APTV",
        "percentage":4.62772131685107,
        "industry":"Consumer Discresionary"
      },
      {
        "company":"Becton Dickinson",
        "ticker":"BDX",
        "percentage":4.08420101233683,
        "industry":"Healthcare"
      },
      {
        "company":"Western Digital",
        "ticker":"WDC",
        "percentage":5.45875195146086,
        "industry":"Materials"
      },
      {
        "company":"Honeywell Int'l Inc.",
        "ticker":"HON",
        "percentage":1.63862248023288,
        "industry":"Utilities"
      },
      {
        "company":"KeyCorp",
        "ticker":"KEY",
        "percentage":2.22320192808033,
        "industry":"Financials"
      },
      {
        "company":"Gilead Sciences",
        "ticker":"GILD",
        "percentage":2.99402750328811,
        "industry":"Healthcare"
      },
      {
        "company":"Wyndham Worldwide",
        "ticker":"WH",
        "percentage":5.25574650750162,
        "industry":"Real Estate"
      },
      {
        "company":"Bitcoin",
        "ticker":"BTC",
        "percentage":6.7,
        "industry":"Crypto",
        "icon": require('./Icons/bitcoin-icon-6219383_1280.webp'),
      },
      {
        "company":"Ameren Corp",
        "ticker":"AEE",
        "percentage":5.68678782130423,
        "industry":"Energy"
      },
      {
        "company":"Johnson & Johnson",
        "ticker":"JNJ",
        "percentage":7.99665147726946,
        "industry":"Healthcare",
        "icon": require('./Icons/J&J_LOGO.jpeg'),
      },
      {
        "company":"Zimmer Biomet Holdings",
        "ticker":"ZBH",
        "percentage":4.30312780653958,
        "industry":"Materials"
      },
      {
        "company":"Wells Fargo",
        "ticker":"WFC",
        "percentage":1.80495955812249,
        "industry":"Financials",
        // "icon": require('./Icons/WELLSFARGO_ICON.png'),
      },
      {
        "company":"Pulte Homes Inc.",
        "ticker":"PHM",
        "percentage":7.01695473755034,
        "industry":"Industrials"
      },
      {
        "company":"Whirlpool Corp.",
        "ticker":"WHR",
        "percentage":6.52299277917438,
        "industry":"Materials"
      },
      {
        "company":"Eastman Chemical",
        "ticker":"EMN",
        "percentage":4.09763950806622,
        "industry":"Materials"
      },
      {
        "company":"PPL Corp.",
        "ticker":"PPL",
        "percentage":7.29998983438861,
        "industry":"Energy"
      },
      {
        "company":"C. H. Robinson Worldwide",
        "ticker":"CHRW",
        "percentage":6.52299277917438,
        "industry":"Materials"
      },
      {
        "company":"Welltower Inc",
        "ticker":"WELL",
        "percentage":1.96581225655552,
        "industry":"REIT"
      },
      {
        "company":"Coca-Cola Company",
        "ticker":"KO",
        "percentage":7.78863594309564,
        "industry":"Consumer Staples"
      },
      {
        "company":"AT&T Inc",
        "ticker":"T",
        "percentage":4.83110121343029,
        "industry":"Communication Services"
      },
      {
        "company":"Newfield Exploration Co",
        "ticker":"NFX",
        "percentage":7.74591102904626,
        "industry":"Energy"
      },
    ]
  },
  {
    "id" : 2,
    "name":"Matthew Flowers",
    "strategy":"Based off of my macroeconomic and psychological research, I believe that consumer discretionary spending is going to continue to increase as pressures from social media and other external factors shift the younger demographics expenditures. I believe this will only continue to increase as these generations receive a greater share of the working forces income. This is balanced against a large position in healthcare as the baby boomer population ages and needs more medical attention. ",
    "risk":"A-",
    "price" : "15.00",
    "bio": "I am a professor of Economics with a dual Masters in Economics and Psychology from UVA. On top of my research I do consulting work for Pension Funds regarding macro environment trends that are likely to impact the economy in the coming quarters. Much of my research (and portfolio) addresses the cross roads of economic trends and consumer spending as external pressures continually influence people’s consumption behavior. ",
    "photo" : require('./Headshots/Matthew_Flowers.jpg'),
    "stocks":[
      {
        "company":"Delphi Automotive PLC",
        "ticker":"APTV",
        "percentage":4.62772131685107,
        "industry":"Consumer Discresionary"
      },
      {
        "company":"Becton Dickinson",
        "ticker":"BDX",
        "percentage":4.08420101233683,
        "industry":"Healthcare"
      },
      {
        "company":"Western Digital",
        "ticker":"WDC",
        "percentage":5.45875195146086,
        "industry":"Materials"
      },
      {
        "company":"Honeywell Int'l Inc.",
        "ticker":"HON",
        "percentage":1.63862248023288,
        "industry":"Utilities"
      },
      {
        "company":"KeyCorp",
        "ticker":"KEY",
        "percentage":2.22320192808033,
        "industry":"Financials"
      },
      {
        "company":"Gilead Sciences",
        "ticker":"GILD",
        "percentage":2.99402750328811,
        "industry":"Healthcare"
      },
      {
        "company":"Wyndham Worldwide",
        "ticker":"WH",
        "percentage":5.25574650750162,
        "industry":"Real Estate"
      },
      {
        "company":"Bitcoin",
        "ticker":"BTC",
        "percentage":6.7,
        "industry":"Crypto",
        "icon": require('./Icons/bitcoin-icon-6219383_1280.webp'),
      },
      {
        "company":"Ameren Corp",
        "ticker":"AEE",
        "percentage":5.68678782130423,
        "industry":"Energy"
      },
      {
        "company":"Johnson & Johnson",
        "ticker":"JNJ",
        "percentage":7.99665147726946,
        "industry":"Healthcare"
      },
      {
        "company":"Zimmer Biomet Holdings",
        "ticker":"ZBH",
        "percentage":4.30312780653958,
        "industry":"Materials"
      },
      {
        "company":"Wells Fargo",
        "ticker":"WFC",
        "percentage":1.80495955812249,
        "industry":"Financials",
        "icon": require('./Icons/WELLSFARGO_ICON.png'),
      },
      {
        "company":"Pulte Homes Inc.",
        "ticker":"PHM",
        "percentage":7.01695473755034,
        "industry":"Industrials"
      },
      {
        "company":"Whirlpool Corp.",
        "ticker":"WHR",
        "percentage":6.52299277917438,
        "industry":"Materials",
        "icon": require('./Icons/WHIRLPOOL_LOGO.png'),
      },
      {
        "company":"Eastman Chemical",
        "ticker":"EMN",
        "percentage":4.09763950806622,
        "industry":"Materials"
      },
      {
        "company":"PPL Corp.",
        "ticker":"PPL",
        "percentage":7.29998983438861,
        "industry":"Energy"
      },
      {
        "company":"C. H. Robinson Worldwide",
        "ticker":"CHRW",
        "percentage":6.52299277917438,
        "industry":"Materials"
      },
      {
        "company":"Welltower Inc",
        "ticker":"WELL",
        "percentage":1.96581225655552,
        "industry":"REIT"
      },
      {
        "company":"Coca-Cola Company",
        "ticker":"KO",
        "percentage":7.78863594309564,
        "industry":"Consumer Staples",
        "icon": require('./Icons/1500px_Coca_Cola_logo.png'),
      },
      {
        "company":"AT&T Inc",
        "ticker":"T",
        "percentage":4.83110121343029,
        "industry":"Communication Services",
        "icon": require('./Icons/ATT&T_LOGO.png'),
      },
      {
        "company":"Newfield Exploration Co",
        "ticker":"NFX",
        "percentage":7.74591102904626,
        "industry":"Energy"
      },
    ]
  },
  {
    "id" : 3,
    "name":"Simon Lawrence",
    "strategy":"My portfolio is designed to generate high return-to-risk ratio. Comprised of mostly blue chip and high dividend stocks, the portfolio relies on many of the strongest US companies throughout history to continue in their success and prosperity in their respective markets. Many of these companies have strong international presences increasing diversity and opening opportunities to penetrate new markets and see significant growth without significant risk. My risk comes from Crypto and the Ark investment positions which I believe are poised for incredible growth and are currently groslly undervalued.",
    "risk":"B",
    "ROI" : "38",
    "price" : "25.00",
    "bio" : "Early in my career I worked in the equity capital markets group at Deutsche Bank, staffing mostly large technology deals. From there, I went into private equity at Carlyle Group where I noticed a lot of friends relying on my information about investments. I began using social media to raise awareness of portfolio strategies that I believed could outperform the major stock indices. For the last three years, I have been sharing this information full time and working as a technical analysis consultant for small fund managers.",
    "photo" : require('./Headshots/Simon_Lawrence.jpg'),
    "stocks":[
      {
        "company":"Coca Cola",
        "ticker":"KO",
        "percentage":7,
        "industry":"Consumer Staples",
        "icon": require('./Icons/1500px_Coca_Cola_logo.png'),
      },
      {
        "company":"Walmart",
        "ticker":"WMT",
        "percentage":5,
        "industry":"Consumer Staples",
        "icon": require('./Icons/Walmart_Spark.svg.png'),
      },
      {
        "company":"Microsoft",
        "ticker":"MSFT",
        "percentage":4,
        "industry":"Information Technology",
        "icon": require('./Icons/MSFT_LOGO.png'),
      },
      {
        "company":"JP Morgan Chase",
        "ticker":"JPM",
        "percentage":9,
        "industry":"Financials",
        "icon": require('./Icons/JP_ICON.jpeg'),
      },
      {
        "company":"Home Depot",
        "ticker":"HD",
        "percentage":3,
        "industry":"Consumer Staples",
        "icon": require('./Icons/Home-Depot-Logo.webp'),
      },
      {
        "company":"Nike",
        "ticker":"NKE",
        "percentage":6,
        "industry":"Consumer Staples",
        "icon": require('./Icons/NIKE_LOGO.png'),
      },
      {
        "company":"Marathon Oil Co.",
        "ticker":"MRO",
        "percentage":5,
        "industry":"Energy",
        "icon": require('./Icons/1200px-Marathon_Oil_logo_2009.svg.png'),
      },
      {
        "company":"Hess",
        "ticker":"HES",
        "percentage":14,
        "industry":"Energy",
        "icon": require('./Icons/HESS_LOGO.png'),
      },
      {
        "company":"S&P 500",
        "ticker":"IVV",
        "percentage":24,
        "industry":"ETF"
      },
      {
        "company":"Ark Invest",
        "ticker":"ARKK",
        "percentage":8,
        "industry":"ETF"
      },
      {
        "company":"Ethereum",
        "ticker":"ETH",
        "percentage":15,
        "industry":"Crypto",
        "icon": require('./Icons/ETH_LOGO.png')
      },
      {
        "company":"Bitcoin",
        "ticker":"BTC",
        "percentage":12,
        "industry":"Crypto",
        "icon": require('./Icons/bitcoin-icon-6219383_1280.webp'),
      },
    ]
  },
  {
    "id" : 4,
    "name":"Ryan Williams",
    "strategy":"My Portfolio is diverse amongst sectors but concentrated in specific blue chip stocks within them. With recent market volatility, and concerns about global supply chains, inflation, interest rates, and general macroeconomic trends these companies’ business plans and structures will outperform their competition given market headwinds.",
    "risk":"B",
    "price" : "40.00",
    "bio": "I began my personal finance career with a serious lack of insight. I was overwhelmed with college debt and had a decent job, but between my debt, rent, and keeping up with friends- I constantly felt strapped on cash. This lead me to research quite a bit about personal finance and shortly thereafter, the stock market. In the last 5 years, I have amassed a following teaching people about personal finance and money tips across my social media pages. ",
    "photo" : require('./Headshots/Ryan_Williams.jpg'),
    "stocks":[
      {
        "company":"Microchip Technology",
        "ticker":"MCHP",
        "percentage":5.71083241558082,
        "industry":"Information Technology"
      },
      {
        "company":"Valero Energy",
        "ticker":"VLO",
        "percentage":3.53943258398519,
        "industry":"Energy"
      },
      {
        "company":"Total System Services",
        "ticker":"TSS",
        "percentage":7.40097223720202,
        "industry":"Information Technology"
      },
      {
        "company":"Masco Corp.",
        "ticker":"MAS",
        "percentage":4.28339386107631,
        "industry":"Industrials"
      },
      {
        "company":"Mohawk Industries",
        "ticker":"MHK",
        "percentage":8.566409900187,
        "industry":"Consumer Discresionary"
      },
      {
        "company":"Hasbro Inc.",
        "ticker":"HAS",
        "percentage":8.70951198137522,
        "industry":"Consumer Discresionary"
      },
      {
        "company":"Equinix",
        "ticker":"EQIX",
        "percentage":8.02672316116019,
        "industry":"Real Estate"
      },
      {
        "company":"Time Warner Inc.",
        "ticker":"CHTR",
        "percentage":6.39650878025292,
        "industry":"Consumer Discresionary"
      },
      {
        "company":"Ingersoll-Rand PLC",
        "ticker":"IR",
        "percentage":8.44869653112854,
        "industry":"Industrials"
      },
      {
        "company":"Edwards Lifesciences",
        "ticker":"EW",
        "percentage":8.82419797415225,
        "industry":"Healthcare"
      },
      {
        "company":"Medtronic plc",
        "ticker":"MDT",
        "percentage":2.89882429153879,
        "industry":"Healthcare"
      },
      {
        "company":"Nucor Corp.",
        "ticker":"NUE",
        "percentage":0.92062551526717,
        "industry":"Energy"
      },
      {
        "company":"PG&E Corp.",
        "ticker":"PCG",
        "percentage":5.73829965985611,
        "industry":"Utilities"
      },
      {
        "company":"Welltower Inc.",
        "ticker":"WEKK",
        "percentage":7.68052701955045,
        "industry":"Real Estate"
      },
      {
        "company":"Akamai Technologies Inc",
        "ticker":"AKAM",
        "percentage":3.62673634939891,
        "industry":"Information Technology"
      },
      {
        "company":"Boston Properties",
        "ticker":"BXP",
        "percentage":0.041833428009637,
        "industry":"Real Estate"
      },
      {
        "company":"Bath & Body Works",
        "ticker":"BBWI",
        "percentage":5.99988288146594,
        "industry":"Consumer Discresionary",
        "icon": require('./Icons/BBW_LOGO.png'),
      },
      {
        "company":"CenturyLink Inc",
        "ticker":"LUMN",
        "percentage":1.17403299507667,
        "industry":"Communication Services"
      },
      {
        "company":"Mattel Inc.",
        "ticker":"MAT",
        "percentage":2.01255843373586,
        "industry":"Consumer Discresionary"
      },

    ]},

  {
    "id" : 5,
    "name":"Dylan Welch",
    "strategy":"This portfolio is a 50/50 split between Real Estate and the S&P. While it relies heavily on large corporations and the performance of the real estate market, these REITS help diversify across real estate assets. As populations increase and urban areas continue to skyrocket, this portfolio will serve you well. ",
    "risk":"C",
    "price" : "45.00",
    "bio": "Having worked as a real estate asset manager, I was incredibly well versed in the macroeconomic trends in the commercial, retail, and multifamily real estate market. I noticed that very few people were investing in an incredibly lucrative equity opportunity… REITs. These Real Estate Investment Trusts, had made me an incredibly strong return over the last 10 years. So, I took it upon myself to teach people about these well performing assets that seem to always stay out of the media. Follow me to see my favorites!",
    "photo" : require('./Headshots/Dylan_Welch.jpg'),
    "stocks":[
      {
        "company":"Preferred Apartments Communities",
        "ticker":"APT",
        "percentage": 13,
        "industry":"REIT"
      },
      {
        "company":"Gladstone Land",
        "ticker":"LAND",
        "percentage": 15,
        "industry":"REIT"
      },
      {
        "company":"Nextpoint Realty",
        "ticker":"NXRT",
        "percentage": 8,
        "industry":"REIT"
      },
      {
        "company":"Independence Realty",
        "ticker":"IRT",
        "percentage": 5,
        "industry":"REIT"
      },
      {
        "company":"AirBnB",
        "ticker":"ABNB",
        "percentage": 5.5,
        "industry":"REIT",
        "icon": require('./Icons/AIRBNB_LOGO.png')
      },
      {
        "company":"S&P 500 ETF",
        "ticker":"IVV",
        "percentage": 50,
        "industry":"REIT"
      },
    ]
  },

  {
    "id" : 6,
    "name":"Alexandra Goodwin",
    "strategy":"My Portfolio relies heavily on technology and is hedged with Utility and Industrial positions which I believe will outlast historic energy companies. In my years of investing, I have seen this and similar portfolios perform well as tecnhology advancements fuel the growth of the US economy.",
    "risk":"C+",
    "price" : "30.00",
    "bio": "I am a Harvard MBA grad of mathematics and an Econ grad of Washington and Lee University. In between college and grad school I worked at a small private equity shop on the Industrial team. Since graduation at Harvard, I have been primarily focused on technical analysis to inform my day trading. Here, I share my current investment portfolio which gets optimized each year (typically after tax season), based on macroeconomic trends and valuations of companies that I deem are undervalued.",
    "photo" : require('./Headshots/Alexandra_Goodwin.jpg'),
    "stocks":[
      {
        "company":"Texas Instruments",
        "ticker":"TI",
        "percentage": 11.3,
        "industry":"Consumer Discresionary",
        "icon": require('./Icons/TI_LOGO.jpeg')
      },
      {
        "company":"Regeneron",
        "ticker":"REGN",
        "percentage":2.4,
        "industry":"Healthcare"
      },
      {
        "company":"Red Hat Inc.",
        "ticker":"RHT",
        "percentage":9.7,
        "industry":"Information Technology"
      },
      {
        "company":"Cognizant Technology Solutions",
        "ticker":"CTSH",
        "percentage":10.1,
        "industry":"Information Technology"
      },
      {
        "company":"International Paper",
        "ticker":"IP",
        "percentage":16.4,
        "industry":"Industrials"
      },
      {
        "company":"Coca-Cola Company",
        "ticker":"KO",
        "percentage":16.3,
        "industry":"Consumer Staples",
        "icon": require('./Icons/1500px_Coca_Cola_logo.png')
      },
      {
        "company":"Ethereum",
        "ticker":"ETH",
        "percentage":6.0,
        "industry":"Crypto",
        "icon": require('./Icons/ETH_LOGO.png')
      },
      {
        "company":"Bitcoin",
        "ticker":"BTC",
        "percentage":6.7,
        "industry":"Crypto",
        "icon": require('./Icons/bitcoin-icon-6219383_1280.webp'),
      },
      {
        "company":"S&P 500",
        "ticker":"IVV",
        "percentage":7.7,
        "industry":"ETF"
      },
      {
        "company":"Diamond Offshore Drilling",
        "ticker":"DO",
        "percentage":12.3,
        "industry":"Utilities"
      },
    ]
  },

  

  

      {
        "id": 7,
        "name":"James Gill",
        "strategy":"This portfolio is fantastic for anyone nearing retirement like myself. As a financial advisor I have held many of these positions for decades, watching the interst and growth compounding. This incredibly diverse portfolio spreads risk and is one of the safest you will see. While you will not triple your money year over year. You will be earning a pretty penny quite passively as these ETFs are managed by professionals and have a very managment fee... getting the most out of your dollar",
        "risk":"A",
        "price" : "35.00",
        "bio": "For years, I had worked as a private wealth manager. I would manage the investing portfolio for multi-million dollar clients as well as their retirement accounts, estates, and taxes. Since I have retired I have been managing my own portfolio and believe it is important to share information to people who do not have the capital it requires to gain access to wealth managers like myself.",
        "photo" : require('./Headshots/James_Gill.jpg'),
        "stocks":[
          {
            "company":"S&P 500",
            "ticker":"IVV",
            "percentage":27,
            "industry":"ETF"
          },
          {
            "company":"Schwab Small Cap",
            "ticker":"SCHA",
            "percentage":13,
            "industry":"ETF"
          },
          {
            "company":"JP Mid Cap",
            "ticker":"UH",
            "percentage":12,
            "industry":"ETF"
          },
          {
            "company":"Schwab Dividend ETF",
            "ticker":"SCHD",
            "percentage":8,
            "industry":"ETF"
          },
          {
            "company":"Vanguard International",
            "ticker":"VXUS",
            "percentage":23,
            "industry":"ETF"
          },
          {
            "company":"Vanguard Corp Debt",
            "ticker":"VCLT",
            "percentage":7,
            "industry":"ETF"
          },
          {
            "company":"Ark Tech ETF",
            "ticker":"ARKK",
            "percentage":10,
            "industry":"ETF"
          },
          
        ]
      },
      {
        "id": 11,
        "name":"Jasmine Vance",
        "strategy":"This portfolio is very similar to my Crypto Fund where I manage $250M of pooled assets. While this is not a diverse portfolio, the growth and transformative ability of cryptocurrency is truly unprecedented and will have impacts on every corner of the Earth within the next decade. If a stock was growing this rapidly their valuation multiples would be like nothing we have ever seen before in the stock market. Thus, as someone who has a strong income and savings I think this reward is certainly worth the risk.",
        "risk":"D",
        "price" : "20.00",
        "bio": " I am a 27-year-old UPenn grad who has been managing a crypto fund since graduation. When I found out about the potential of blockchain technology, I was incredibly excited to see it’s real world applications revolutionize business as we know it. In the beginning, many people were skeptical about the implementations of blockchain technology and cryptocurrencies as a medium of exchange. After seeing my strong performance, I have been able to increase my assets under management to $375 million over the last 5 years.",
        "photo" : require('./Headshots/Catherine_Thompson.jpg'),
        "stocks":[
          {
            "company":"Bitcoin",
            "ticker":"BTC",
            "percentage":35,
            "industry":"Crypto",
            "icon": require('./Icons/bitcoin-icon-6219383_1280.webp'),
          },
          {
            "company":"Ethereum",
            "ticker":"ETH",
            "percentage":30,
            "industry":"Crypto",
            "icon": require('./Icons/ETH_LOGO.png')
          },
          {
            "company":"Cardano",
            "ticker":"ADA",
            "percentage":15,
            "industry":"Crypto"
          },
          {
            "company":"Solana",
            "ticker":"SOL",
            "percentage":10,
            "industry":"Crypto"
          },
          {
            "company":"Polymath",
            "ticker":"POLY",
            "percentage": 5,
            "industry":"Crypto"
          }
        ]
      },

  
    ]
  export default FakeInvestorData
  // {
  //   "name":"",
  //   "strategy":"",
  //   "risk":"A-",
  //   "photo" : require('./Headshots/Matthew_Flowers.jpg'),
  //   "stocks":[
  //     {
  //       "company":"",
  //       "ticker":"",
  //       "percentage":,
  //       "industry":""
  //     },
  
  //   ]
  // },
  // {
  //   "name":"",
  //   "strategy":"",
  //   "risk":"A-",
  //   "photo" : require('./Headshots/Matthew_Flowers.jpg'),
  //   "stocks":[
  //     {
  //       "company":"",
  //       "ticker":"",
  //       "percentage":,
  //       "industry":""
  //     },
  
  //   ]
  // },
  // {
  //   "name":"",
  //   "strategy":"",
  //   "risk":"A-",
  //   "photo" : require('../Media/Headshots/Matthew_Flowers.jpg'),
  //   "stocks":[
  //     {
  //       "company":"",
  //       "ticker":"",
  //       "percentage":,
  //       "industry":""
  //     },
  
  //   ]
  // },


  


