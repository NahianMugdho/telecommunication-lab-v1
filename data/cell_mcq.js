/* ===== Cellular MCQ bank (from the uploaded guide, online MCQ part). Fields: n, src(group), mix(question), opts[4], ans(0-3), emix(explanation). To add: copy a { } block before the closing ]. ===== */
window.CELLMCQ=[
{
"n": "M1",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "PCM-এ voice channel-এর bit rate কত?",
"opts": [
"32 kbps",
"64 kbps",
"128 kbps",
"2.048 Mbps"
],
"ans": 1,
"emix": "8 kHz sampling × 8 bit = 64 kbps। (যাচাই: হিসাব)"
},
{
"n": "M2",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "E1 লাইনে মোট কয়টি timeslot এবং গতি কত?",
"opts": [
"24, 1.544 Mbps",
"30, 2.048 Mbps",
"32, 2.048 Mbps",
"32, 1.544 Mbps"
],
"ans": 2,
"emix": "32 × 64 kbps = 2.048 Mbps; এর মধ্যে 30টি voice, 2টি framing/signalling। (T1 = 24 channel, 1.544 Mbps।)"
},
{
"n": "M3",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Nyquist অনুযায়ী 4 kHz সিগনালের ন্যূনতম sampling rate?",
"opts": [
"4 kHz",
"6 kHz",
"8 kHz",
"16 kHz"
],
"ans": 2,
"emix": "fs ≥ 2 fmax।"
},
{
"n": "M4",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "3 dB বাড়া মানে power কত গুণ?",
"opts": [
"1.5",
"2",
"3",
"10"
],
"ans": 1,
"emix": "10·log₁₀(2) ≈ 3 dB।"
},
{
"n": "M5",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "30 dBm = কত watt?",
"opts": [
"0.03 W",
"0.3 W",
"1 W",
"3 W"
],
"ans": 2,
"emix": "0 dBm = 1 mW; 30 dBm = 1000 mW = 1 W।"
},
{
"n": "M6",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Shannon capacity সূত্র কোনটি?",
"opts": [
"C = B·log₂(1 + S/N)",
"C = 2B",
"C = B/log₂(N)",
"C = S·N"
],
"ans": 0,
"emix": ""
},
{
"n": "M7",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Erlang কিসের একক?",
"opts": [
"তথ্যের গতি",
"traffic intensity",
"power",
"frequency"
],
"ans": 1,
"emix": "এক ঘণ্টায় একটি channel পুরোপুরি ব্যস্ত থাকা = 1 Erlang।"
},
{
"n": "M8",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "10 Erlang traffic, 2% blocking হলে (Erlang-B) প্রয়োজনীয় channel সংখ্যা?",
"opts": [
"14",
"15",
"17",
"20"
],
"ans": 2,
"emix": "কোডে যাচাই: 17। (Erlang-B(10, 18) = 0.0071।)"
},
{
"n": "M9",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Free-space path loss কীসের সঙ্গে বাড়ে?",
"opts": [
"শুধু দূরত্ব",
"শুধু frequency",
"দূরত্ব ও frequency উভয়ের সঙ্গে",
"কোনোটিই নয়"
],
"ans": 2,
"emix": "FSPL(dB) = 32.44 + 20log d(km) + 20log f(MHz)। 1 km, 2100 MHz-এ ≈ 98.89 dB।"
},
{
"n": "M10",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Cellular-এ hexagonal cluster-এর সম্ভাব্য N কোনটি?",
"opts": [
"5",
"6",
"7",
"8"
],
"ans": 2,
"emix": "N = i² + ij + j²; (i,j) = (2,1) → 7। (5, 6, 8 এই সূত্রে হয় না।)"
},
{
"n": "M11",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Reuse distance D = ?",
"opts": [
"R√(3N)",
"R·N",
"3R√N",
"R/N"
],
"ans": 0,
"emix": ""
},
{
"n": "M12",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "N = 7 হলে আনুমানিক SIR (6 interferer, γ = 4)?",
"opts": [
"11.3 dB",
"13.8 dB",
"18.66 dB",
"23.3 dB"
],
"ans": 2,
"emix": "কোডে যাচাই: N=3 → 11.30, N=4 → 13.80, N=7 → 18.66, N=12 → 23.34 dB।"
},
{
"n": "M13",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Cluster size N বাড়ালে কী হয়?",
"opts": [
"Capacity বাড়ে, interference বাড়ে",
"Capacity কমে, interference কমে",
"দুটোই বাড়ে",
"কোনো পরিবর্তন নেই"
],
"ans": 1,
"emix": ""
},
{
"n": "M14",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "কোন কৌশলে ঘন ট্রাফিক এলাকায় cell-এর capacity বাড়ানো হয়?",
"opts": [
"Cell splitting",
"Frequency কমানো",
"Power বাড়ানো",
"Antenna সরানো"
],
"ans": 0,
"emix": "Cell splitting / sectoring।"
},
{
"n": "M15",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "Handoff-এর সময় পুরনো link আগে কাটে আর নতুনটি পরে জোড়া লাগে, একে কী বলে?",
"opts": [
"Soft handoff",
"Hard handoff",
"Roaming",
"Paging"
],
"ans": 1,
"emix": "(Soft = make-before-break।)"
},
{
"n": "M16",
"src": "ক. ভিত্তি ও Radio (Topic 1–5)",
"mix": "99.999% availability মানে বছরে ডাউনটাইম আনুমানিক?",
"opts": [
"5.26 মিনিট",
"52 মিনিট",
"8.76 ঘণ্টা",
"3.65 দিন"
],
"ans": 0,
"emix": "কোডে যাচাই।"
},
{
"n": "M17",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "GSM-এ subscriber-এর permanent data কোথায় থাকে?",
"opts": [
"VLR",
"HLR",
"BSC",
"MSC"
],
"ans": 1,
"emix": "VLR অস্থায়ী (visitor) data রাখে। LTE-তে HSS, 5G-তে UDM।"
},
{
"n": "M18",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "LTE/EPC-তে user-plane gateway কোনটি?",
"opts": [
"MME",
"S-GW ও P-GW",
"HSS",
"PCRF"
],
"ans": 1,
"emix": "MME = control plane।"
},
{
"n": "M19",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "5G Core-এ AMF-এর কাজ কোনটি?",
"opts": [
"Access ও Mobility management",
"Session routing",
"Charging",
"Slice selection"
],
"ans": 0,
"emix": "Session = SMF, slice selection = NSSF। (সূত্র: techjunction 5G core)"
},
{
"n": "M20",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "5GC-র architecture ধরন কী?",
"opts": [
"Point-to-point",
"Service-Based Architecture (SBA)",
"Ring",
"Star-only"
],
"ans": 1,
"emix": "Network Function গুলো service-based interface-এ কথা বলে।"
},
{
"n": "M21",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "GTP-U কিসে বহন করে?",
"opts": [
"Signalling",
"User data tunnel",
"Billing",
"DNS"
],
"ans": 1,
"emix": "GTP-C = control।"
},
{
"n": "M22",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "EPS bearer-এর QoS identifier কী?",
"opts": [
"QCI",
"IMSI",
"APN",
"TEID"
],
"ans": 0,
"emix": ""
},
{
"n": "M23",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "5G NR-এ SIM-এর পরিচয় গোপন রাখতে কী ব্যবহার হয়?",
"opts": [
"IMSI সরাসরি",
"SUCI",
"MAC address",
"IMEI"
],
"ans": 1,
"emix": "SUPI-কে এনক্রিপ্ট করে SUCI পাঠানো হয়।"
},
{
"n": "M24",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "NFV-তে ETSI MANO-র তিন অংশ?",
"opts": [
"NFVO, VNFM, VIM",
"MME, HSS, PCRF",
"AMF, SMF, UPF",
"BTS, BSC, MSC"
],
"ans": 0,
"emix": "(সূত্র: techjunction NFV)"
},
{
"n": "M25",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "NFV-র মূল ধারণা?",
"opts": [
"বিশেষ hardware বাড়ানো",
"Network function-কে software হিসেবে standard server-এ চালানো",
"Cable কমানো",
"Antenna বদলানো"
],
"ans": 1,
"emix": ""
},
{
"n": "M26",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "SDN-এ control plane ও data plane-এর সম্পর্ক?",
"opts": [
"একই device-এ আটকে থাকে",
"আলাদা করা হয়, controller কেন্দ্রীয়ভাবে নিয়ন্ত্রণ করে",
"data plane নেই",
"শুধু radio-তে"
],
"ans": 1,
"emix": "OpenFlow সাধারণ southbound protocol।"
},
{
"n": "M27",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "FCAPS-এর 'A' কী?",
"opts": [
"Assurance",
"Accounting",
"Access",
"Authentication"
],
"ans": 1,
"emix": "(techjunction-এ ভুল আছে, উপরে দেখো।)"
},
{
"n": "M28",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "O-RAN-এ near-real-time RIC কোন interface-এ E2 node-এর সঙ্গে কথা বলে?",
"opts": [
"A1",
"E2",
"O1",
"X2"
],
"ans": 1,
"emix": "A1 = non-RT RIC ↔︎ near-RT RIC; O1 = management।"
},
{
"n": "M29",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "5G network slicing-এ slice চেনার identifier?",
"opts": [
"S-NSSAI",
"IMEI",
"ICCID",
"LAC"
],
"ans": 0,
"emix": "তিন মূল use case: eMBB, URLLC, mMTC।"
},
{
"n": "M30",
"src": "খ. Core ও Packet (Topic 6–9)",
"mix": "URLLC-র লক্ষ্য?",
"opts": [
"অতি উচ্চ গতি",
"অতি কম latency ও উচ্চ reliability",
"বিপুল IoT device",
"কম খরচ"
],
"ans": 1,
"emix": ""
},
{
"n": "M31",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "SIP-এ call শুরুর মেসেজ কোনটি?",
"opts": [
"REGISTER",
"INVITE",
"BYE",
"ACK"
],
"ans": 1,
"emix": "বাস্তব ক্রম: INVITE → 180 Ringing → 200 OK → ACK।"
},
{
"n": "M32",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "SDP কী বহন করে?",
"opts": [
"Media codec, IP, port প্রস্তাব",
"Billing",
"শুধু নিরাপত্তা",
"Routing table"
],
"ans": 0,
"emix": ""
},
{
"n": "M33",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "SS7-এ ISUP কিসের জন্য?",
"opts": [
"Call setup/teardown",
"SMS",
"Data",
"Radio"
],
"ans": 0,
"emix": "(MAP = mobile-specific, যেমন HLR query)"
},
{
"n": "M34",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "IMS-এ সবিকিছুর কেন্দ্রীয় SIP সার্ভার কোনটি, যেটি registrar ও service নিয়ন্ত্রণ করে?",
"opts": [
"P-CSCF",
"I-CSCF",
"S-CSCF",
"BGCF"
],
"ans": 2,
"emix": "P-CSCF = UE-র প্রথম যোগাযোগ বিন্দু; I-CSCF = নেটওয়ার্কের প্রবেশদ্বার। (সূত্র: telecomtrainer IMS)"
},
{
"n": "M35",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "VoLTE-তে voice-এর জন্য dedicated bearer-এর QCI?",
"opts": [
"1",
"5",
"9",
"8"
],
"ans": 0,
"emix": "QCI 1 = conversational voice (GBR); QCI 5 = IMS signalling।"
},
{
"n": "M36",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "VoLTE থেকে LTE এলাকা ছেড়ে পুরনো 2G/3G-এ কল নিয়ে যাওয়ার কৌশল?",
"opts": [
"CSFB",
"SRVCC",
"MIMO",
"Carrier Aggregation"
],
"ans": 1,
"emix": "CSFB = কলের আগে fallback।"
},
{
"n": "M37",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "GSM authentication-এ SRES হিসাবে কোন algorithm?",
"opts": [
"A3",
"A5",
"A8",
"A1"
],
"ans": 0,
"emix": "A8 = cipher key Kc; A5 = encryption।"
},
{
"n": "M38",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "GSM-এ নিরাপত্তায় network subscriber-কে authenticate করে — এটিকে কী বলে?",
"opts": [
"Mutual authentication",
"One-way authentication",
"Zero-trust",
"Hashing"
],
"ans": 1,
"emix": "3G/4G-এ AKA mutual authentication হয়।"
},
{
"n": "M39",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "EIR কী যাচাই করে?",
"opts": [
"IMEI",
"IMSI",
"MSISDN",
"TMSI"
],
"ans": 0,
"emix": "Stolen/blacklisted handset নিয়ন্ত্রণ।"
},
{
"n": "M40",
"src": "গ. Call Flow, IMS, Security (Topic 11–14)",
"mix": "TMSI কেন ব্যবহার হয়?",
"opts": [
"Billing",
"IMSI কম প্রকাশের জন্য",
"Speed বাড়ানো",
"Roaming বন্ধ"
],
"ans": 1,
"emix": "Temporary identity স্থানীয়ভাবে ব্যবহার হয়।"
},
{
"n": "M41",
"src": "ঘ. Power (Topic 15)",
"mix": "Telecom site-এ সাধারণ DC ভোল্টেজ?",
"opts": [
"+12 V",
"−48 V",
"110 V",
"220 V DC"
],
"ans": 1,
"emix": "(সূত্র: everexceed — সিগন্যাল নয়েজ কম, নিরাপত্তা ও ক্ষয় রোধে ভালো।)"
},
{
"n": "M42",
"src": "ঘ. Power (Topic 15)",
"mix": "24-cell VRLA ব্যাটারির float voltage (প্রতি cell 2.25 V) কত?",
"opts": [
"48 V",
"54 V",
"56 V",
"60 V"
],
"ans": 1,
"emix": "24 × 2.25 = 54.0 V।"
},
{
"n": "M43",
"src": "ঘ. Power (Topic 15)",
"mix": "LVD (Low Voltage Disconnect) প্রতি cell 1.8 V ধরলে 24 cell-এ কত V-এ disconnect?",
"opts": [
"40.0 V",
"43.2 V",
"46.0 V",
"48 V"
],
"ans": 1,
"emix": "24 × 1.8 = 43.2।"
},
{
"n": "M44",
"src": "ঘ. Power (Topic 15)",
"mix": "লোড 80 A, রেটিং 50 A এর rectifier module, N+1 রিডান্ডান্সি হলে মোট module?",
"opts": [
"2",
"3",
"4",
"5"
],
"ans": 1,
"emix": "80/50 → 2 module লাগে, +1 স্পেয়ার = 3।"
},
{
"n": "M45",
"src": "ঘ. Power (Topic 15)",
"mix": "সাইটে বিদ্যুৎ না থাকলে কোনটি স্বয়ংক্রিয়ভাবে চালু হয়?",
"opts": [
"ATS/AMF সহ DG",
"Inverter-শুধু",
"Router",
"Antenna"
],
"ans": 0,
"emix": ""
},
{
"n": "M46",
"src": "ঙ. Scripting ও Bangladesh (Topic 16–17)",
"mix": "Python-এ মাল্টি-ডিভাইস SSH automation-এ জনপ্রিয় লাইব্রেরি?",
"opts": [
"Netmiko",
"Pygame",
"Matplotlib-শুধু",
"Flask-শুধু"
],
"ans": 0,
"emix": "NETCONF/YANG model-driven বিকল্প।"
},
{
"n": "M47",
"src": "ঙ. Scripting ও Bangladesh (Topic 16–17)",
"mix": "Monte Carlo simulation-এ BPSK BER মেলানোর ফলাফল (4 dB)?",
"opts": [
"তত্ত্ব 0.01250, সিমুলেশন 0.01249",
"তত্ত্ব 0.1, সিমুলেশন 0.5",
"তত্ত্ব 0.0001",
"কোনো মিল নেই"
],
"ans": 0,
"emix": "কোড চালিয়ে যাচাই।"
},
{
"n": "M48",
"src": "ঙ. Scripting ও Bangladesh (Topic 16–17)",
"mix": "Bangladesh-এ প্রধান telecom regulator?",
"opts": [
"BTCL",
"BTRC",
"BCC",
"NTMC"
],
"ans": 1,
"emix": "BTRC = Bangladesh Telecommunication Regulatory Commission।"
},
{
"n": "M49",
"src": "ঙ. Scripting ও Bangladesh (Topic 16–17)",
"mix": "Teletalk Bangladesh-এর মালিকানা ধরন?",
"opts": [
"বিদেশি বেসরকারি",
"সরকারি মালিকানাধীন মোবাইল অপারেটর",
"সেনাবাহিনীর",
"NGO"
],
"ans": 1,
"emix": "(সূত্র: Teletalk corporate page, Wikipedia)"
},
{
"n": "M50",
"src": "ঙ. Scripting ও Bangladesh (Topic 16–17)",
"mix": "Bangladesh-এ সাবমেরিন ক্যাবল SEA-ME-WE 4 কোথায় landing করে?",
"opts": [
"ক্যাবলের স্থান কক্সবাজার",
"সিলেট",
"বরিশাল",
"রাজশাহী"
],
"ans": 0,
"emix": "SEA-ME-WE 5 কুয়াকাটায়।"
},
{
"n": "M51",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "Communication-এ বাধা (barrier) কোনটি নয়?",
"opts": [
"Noise",
"Jargon",
"Active listening",
"Language gap"
],
"ans": 2,
"emix": "Active listening কার্যকর communication-এর কৌশল।"
},
{
"n": "M52",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "Formal email-এ সবচেয়ে শুরুর দিকে কী থাকা উচিত?",
"opts": [
"পরিষ্কার subject ও সম্বোধন",
"ইমোজি",
"লম্বা গল্প",
"কিছুই না"
],
"ans": 0,
"emix": ""
},
{
"n": "M53",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "দাম 20% বাড়িয়ে পরে 20% কমালে নিট পরিবর্তন?",
"opts": [
"0%",
"4% ক্ষতি",
"4% বৃদ্ধি",
"10% ক্ষতি"
],
"ans": 1,
"emix": "1.2 × 0.8 = 0.96।"
},
{
"n": "M54",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "A 12 দিনে, B 18 দিনে কাজ করলে একসাথে কত দিন?",
"opts": [
"6",
"7.2",
"15",
"30"
],
"ans": 1,
"emix": ""
},
{
"n": "M55",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "7^23-এর শেষ অঙ্ক?",
"opts": [
"1",
"3",
"7",
"9"
],
"ans": 1,
"emix": ""
},
{
"n": "M56",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "TELETALK শব্দের অক্ষর সাজানোর মোট উপায়?",
"opts": [
"5040",
"40320",
"20160",
"10080"
],
"ans": 0,
"emix": "8!/(2!·2!·2!) = 40320/8 = 5040।"
},
{
"n": "M57",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "5000 টাকা, 8%, 3 বছরে চক্রবৃদ্ধি সুদ?",
"opts": [
"1200",
"1298.56",
"1250",
"1300"
],
"ans": 1,
"emix": "SI হলে 1200।"
},
{
"n": "M58",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "তিনটি মুদ্রা ছুড়লে অন্তত একটি head আসার সম্ভাবনা?",
"opts": [
"1/8",
"1/2",
"3/4",
"7/8"
],
"ans": 3,
"emix": ""
},
{
"n": "M59",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "40 ও 60 km/h-এ সমান দূরত্ব গেলে গড় গতি?",
"opts": [
"50",
"48",
"52",
"45"
],
"ans": 1,
"emix": ""
},
{
"n": "M60",
"src": "চ. Communication ও Aptitude (Topic 18–19)",
"mix": "ধারা 2, 6, 12, 20, 30, ?",
"opts": [
"40",
"42",
"44",
"36"
],
"ans": 1,
"emix": "n(n+1)।"
}
];
