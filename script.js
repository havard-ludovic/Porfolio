// 1. VARIABLES GLOBALES
let currentScale = 1;
let currentLog = 0;
let isDragging = false;
let startX, startY;
let imgPosX = 0, imgPosY = 0;

// Données des missions
const missions = [
    {
        id: "01 / 04",
        entreprise: "Projet Personnel",
        periode: "Depuis 2023",
        mission: "SECURITE OFFENSIVE, BUG BOUNTY & CTF",
        details: [
            "> Bug bounty sur HackerOne (Vulnérabilités Web trouvées et validées)",
            "> Développement d'un outil d'énumération des sous-domaines en python (<a class='mission_link' target='_blank' rel='noopener noreferrer' href=https://github.com/havard-ludovic/subenum>lien outil</a>)", // target='_blank' Ouvre le lien dans un nouvel onglet et rel='noopener noreferrer' Sécurité 
            "> CTF & challenges techniques sur Hack The Box et Root Me",
            "> Participation aux événements comme HackDay, UofTCTF et PicoCTF",
            "> Rédaction de Write-ups et rapports (<a class='mission_link' target='_blank' rel='noopener noreferrer' href=https://github.com/havard-ludovic/CTF_Write-ups>lien Write-ups</a>)",
            "> Audit technique OWASP Juice Shop et rédaction du rapport"
        ],
        images: []
    },
    {
        id: "02 / 04",
        entreprise: "Headmind Partners",
        periode: "Février - Août 2024",
        mission: "GESTION DES VULNERABILITES",
        details: [
            "Mission chez un client international",
            "> Suivi des vulnérabilités des ressources Azure en central, dans les régions et dans les échanges avec les régions",
            "> Création de dashboards de suivi des audits, remédiations et budgets (PowerBI)",
            "> Amélioration de l'application de suivi des régions (PowerApps)",
            "> Scripts Python pour automatiser des activités récurrentes"
        ],
        images: ["image/mission/Headmind_1.png", "image/mission/Headmind_2.png"]
    },
    {
        id: "03 / 04",
        entreprise: "Banque de France",
        periode: "Mai - Août 2023",
        mission: "CERTIFICATS CRYPTOGRAPHIQUES",
        details: [
            "> Gestion du projet d'archivage numérique des demandes de certificats",
            "> Mise en place de l'application choisie auprès de l'équipe",
            "> Production de certificats X509 sur des supports physiques (token usb et carte à puce)",
            "> Refonte des statistiques suite à la montée de version de l'application de gestion des certificats"
        ],
        images: []
    },
    {
        id: "04 / 04",
        entreprise: "LGM",
        periode: "Septembre 2022 - Avril 2023",
        mission: "PHISHING - Application de sensibilisation",
        details: [
            "> Génération des mails avec un lien hypertexte envoyé à une liste d'emails fournis en entrée",
            "> Création de fausses pages de connexion",
            "> Création d'une page pédagogique pour infomer les utilisateurs des points sur lesquels il faut porter son attention",
            "> Affichage des résultats de la campagne (nombre de mails envoyés, de clics sur le lien et de mots de passe entrés)"
        ],
        images: ["image/mission/fausse_page_connexion.png", "image/mission/sensibilisation_phishing.png"]
    }
];

// 2. FONCTIONS DE LA MODALE (Accessibles via onclick)
window.openModal = function (src) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImg");

    if (modal && fullImg) {
        modal.style.display = "flex";
        fullImg.src = src;
        currentScale = 1;
        imgPosX = 0;
        imgPosY = 0;
        fullImg.style.transform = `scale(${currentScale}) translate(0px, 0px)`;
        document.body.style.overflow = "hidden";
    }
};

window.closeModal = function () {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

// 3. LOGIQUE D'AFFICHAGE DES LOGS
function updateLog(direction) {
    const logContainer = document.getElementById('logContent');
    const logCounter = document.getElementById('logCounter');
    if (!logContainer || !logCounter) return;

    logContainer.style.opacity = '0';
    logContainer.style.transform = direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)';

    setTimeout(() => {
        const m = missions[currentLog];
        logCounter.textContent = `LOG ${m.id}`;

        let imagesHTML = '';
        if (m.images && m.images.length > 0) {
            imagesHTML = `<div class="mission-gallery">`;
            m.images.forEach(imgSrc => {
                imagesHTML += `<img src="${imgSrc}" alt="Capture" class="thumb" onclick="openModal(this.src)">`;
            });
            imagesHTML += `</div>`;
        }

        logContainer.innerHTML = `
            <p><span class="label">ENTREPRISE :</span> <span class="val">${m.entreprise}</span></p>
            <p><span class="label">PÉRIODE    :</span> <span class="val">${m.periode}</span></p>
            <p><span class="label">MISSION    :</span> <span class="val">${m.mission}</span></p>
            <div class="log-details">${m.details.map(d => `<p>${d}</p>`).join('')}</div>
            ${imagesHTML} 
        `;

        logContainer.style.transform = direction === 'next' ? 'translateX(20px)' : 'translateX(-20px)';
        logContainer.offsetHeight;
        logContainer.style.opacity = '1';
        logContainer.style.transform = 'translateX(0)';
    }, 300);
}

// Change d'onglet
function showTab(tabId) {
    // 1. Désactiver tous les onglets
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.badge-btn').forEach(btn => btn.classList.remove('active'));

    // 2. Activer l'onglet sélectionné
    document.getElementById(tabId).classList.add('active');

    // 3. Mettre le bouton en surbrillance
    event.currentTarget.classList.add('active');
}

// Gère le bouton "Voir plus"
function toggleMore(gridId, btn) {
    const grid = document.getElementById(gridId);
    const extras = grid.querySelectorAll('.extra');

    extras.forEach(img => {
        img.classList.toggle('hidden');
    });

    if (btn.innerText === "VOIR PLUS") {
        btn.innerText = "VOIR MOINS";
    } else {
        btn.innerText = "VOIR PLUS";
    }
}

// Données des badges HTB Academy
const HTBAcademyAchievements = [
    { id: "4a4a7168-acd0-11ef-864f-bea50ffe6cb4", name: "Local Privilege Escalation", img_name: "stand-above-all", description: "Privilege escalation is a vital phase of the penetration testing process, one we may revisit multiple times during an engagement. During our assessments, we will encounter a large variety of operating systems and applications. Most often, if we can exploit a vulnerability and gain a foothold on a host, it will be running some version of Windows or Linux." },
    { id: "cad7d79a-b314-11ef-864f-bea50ffe6cb4", name: "Penetration Tester", img_name: "the-protector-of-security", description: "The Penetration Tester Job Role Path is for newcomers to information security who aspire to become professional penetration testers. This path covers core security assessment concepts and provides a deep understanding of the specialized tools, attack tactics, and methodology used during penetration testing." },
    { id: "96f2cd81-cf27-11ee-891c-bea50ffe6cb4", name: "Pivoting, Tunneling, and Port Forwarding", img_name: "explore-deep-space", description: "Using one compromised machine to access another is called pivoting and allows us to access networks and resources that are not directly accessible to us through the compromised host. Port forwarding accepts the traffic on a given IP address and port and redirects it to a different IP address and port combination. Tunneling is a technique that allows us to encapsulate traffic within another protocol so that it looks like a benign traffic stream." },
    { id: "dae230f9-9c49-11ef-864f-bea50ffe6cb4", name: "Linux Privilege Escalation", img_name: "stairway-to-heaven", description: " There are many ways to escalate privileges. This module aims to cover the most common methods emphasizing real-world misconfigurations and flaws that we may encounter in a client environment." },
    { id: "4a46049d-acd0-11ef-864f-bea50ffe6cb4", name: "Windows Privilege Escalation", img_name: "reach-new-permission-heights", description: "This covers common methods while emphasizing real-world misconfigurations and flaws that we may encounter during an assessment. There are many additional \"edge-case\" possibilities not covered in this module. We will cover both modern and legacy Windows Server and Desktop versions that may be present in a client environment." },
    { id: "3e9b7539-9127-11ef-864f-bea50ffe6cb4", name: "Attacking Common Applications", img_name: "attack-from-the-outside", description: "It's common to find the same applications across many different environments. While an application may not be vulnerable in one environment, it may be misconfigured or unpatched in the next. It is important as an assessor to have a firm grasp of enumerating and attacking the common applications discussed in this module. This knowledge will help when encountering other types of applications during assessments." },
    { id: "01a969d2-cf5d-11ef-864f-bea50ffe6cb4", name: "Hacking WordPress", img_name: "hacking-in-the-wild", description:"WordPress is an open-source Content Management System (CMS) that can be used for multiple purposes." },
    { id: "fbf4f7b7-7b2e-11ee-b5a6-bea50ffe6cb4", name: "Intro to Academy", img_name: "academician", description:"Your first stop in Hack The Box Academy to become acquainted with the platform, its features, and its learning process." },
    { id: "c86a5c7e-8230-11ee-b5a6-bea50ffe6cb4", name: "Network Enumeration with Nmap", img_name: "the-eye-that-sees-all", description: "Nmap is one of the most used networking mapping and discovery tools because of its accurate results and efficiency. The tool is widely used by both offensive and defensive security practitioners." },
    { id: "f89d62db-f9a4-11ef-864f-bea50ffe6cb4", name: "Introduction to Bash Scripting", img_name: "do-things-the-traditional-way", description: "Bash scripts to automate tasks on Linux systems. A strong grasp of Bash is a fundamental skill for anyone working in a technical information security role." },
    { id: "c6c1290e-7b44-11ee-b5a6-bea50ffe6cb4", name: "Introduction to Python 3", img_name: "snake-charmer", description: "Automating tedious or otherwise impossible tasks is highly valued during both penetration testing engagements and everyday life. Introduction to Python 3 aims to introduce the student to the world of scripting with Python 3 and covers the essential building blocks needed for a beginner to understand programming." },
    { id: "4ba2a833-4f23-11ef-864f-bea50ffe6cb4", name: "File Inclusion", img_name: "every-road-leads-back-to-root", description: "File Inclusion is a common web application vulnerability, which can be easily overlooked as part of a web application's functionality." },
    { id: "e87ca862-ac8c-11ee-bfb6-bea50ffe6cb4", name: "File Transfers", img_name: "airborne-delivery", description: "During an assessment, it is very common for us to transfer files to and from a target system. This module covers file transfer techniques leveraging tools commonly available across all versions of Windows and Linux systems." },
    { id: "b18bfcaa-b7be-11ef-864f-bea50ffe6cb4", name: "Stack-Based Buffer Overflows on Linux x86", img_name: "out-of-bounds", description: "Buffer overflows are common vulnerabilities in software applications that can be exploited to achieve remote code execution (RCE) or perform a Denial-of-Service (DoS) attack." },
    { id: "b57a091c-b87b-11ef-864f-bea50ffe6cb4", name: "Stack-Based Buffer Overflows on Windows x86", img_name: "attacking-the-registers", description: "This module is your first step into Windows Binary Exploitation, and it will teach you how to exploit local and remote buffer overflow vulnerabilities on Windows machines." },
    { id: "aa5b6f86-1c2c-11ef-b18d-bea50ffe6cb4", name: "SQL Injection Fundamentals", img_name: "drop-your-weapon", description: "SQL injection is a code injection technique used to take advantage of coding vulnerabilities and inject SQL queries via an application to bypass authentication, retrieve data from the back-end database, or achieve code execution on the underlying server." },
    { id: "9326ff45-49c2-11ef-864f-bea50ffe6cb4", name: "SQLMap Essentials", img_name: "join-the-adventure", description: "The SQLMap Essentials module will teach you the basics of using SQLMap to discover various types of SQL Injection vulnerabilities, all the way to the advanced enumeration of databases to retrieve all data of interest." },
    { id: "243b33c6-a9a2-11ee-bfb6-bea50ffe6cb4", name: "Using the Metasploit Framework", img_name: "combine-the-modules", description: "The Metasploit Framework is an open-source set of tools used for network enumeration, attacks, testing security vulnerabilities, evading detection, performing privilege escalation attacks, and performing post-exploitation." },
    { id: "6a75bea4-cdac-11ef-864f-bea50ffe6cb4", name: "JavaScript Deobfuscation", img_name: "playing-with-the-mess", description: "This module will take you step-by-step through the fundamentals of JavaScript Deobfuscation until you can deobfuscate basic JavaScript code and understand its purpose." },
    { id: "41b2c7f8-1838-11ef-b18d-bea50ffe6cb4", name: "Attacking Web Applications with Ffuf", img_name: "fuzzing-is-power", description: "This module covers the fundamental enumeration skills of web fuzzing and directory brute forcing using the Ffuf tool. The techniques learned in this module will help us in locating hidden pages, directories, and parameters when targeting web applications." },
    { id: "a6adbe02-1909-11ef-b18d-bea50ffe6cb4", name: "Login Brute Forcing", img_name: "crude-but-effective", description: "The module contains an exploration of brute-forcing techniques, including the use of tools like Hydra and Medusa, and the importance of strong password practices. It covers various attack scenarios, such as targeting SSH, FTP, and web login forms." },
    { id: "c16f0b90-7db3-11ee-b5a6-bea50ffe6cb4", name: "Getting Started", img_name: "your-first-battle", description: "This module covers the fundamentals of penetration testing and an introduction to Hack The Box." },
    { id: "ba33ac60-cb7c-11ef-864f-bea50ffe6cb4", name: "Broken Authentication", img_name: "just-a-small-crack-and-you-re-in", description: "Broken authentication is listed as #7 on the 2021 OWASP Top 10 Web Application Security Risks, falling under the broader category of Identification and Authentication failures. A vulnerability or misconfiguration at the authentication stage can impact an application's overall security." },
    { id: "38b85895-7bee-11ee-b5a6-bea50ffe6cb4", name: "Penetration Testing Process", img_name: "tactical", description: "This module teaches the penetration testing process broken down into each stage and discussed in detail. We will cover many aspects of the role of a penetration tester during a penetration test, explained and illustrated with detailed examples. The module also covers pre-engagement steps like the criteria for establishing a contract with a client for a penetration testing engagement." },
    { id: "cd7e5357-4c07-11ef-864f-bea50ffe6cb4", name: "Cross-Site Scripting (XSS)", img_name: "included-in-every-report", description: "Cross-Site Scripting (XSS) vulnerabilities are among the most common web application vulnerabilities. An XSS vulnerability may allow an attacker to execute arbitrary JavaScript code within the target's browser and result in complete web application compromise if chained together with other vulnerabilities." },
    { id: "dd4eb73e-a00f-11ee-bfb6-bea50ffe6cb4", name: "Vulnerability Assessment", img_name: "light-in-the-dark", description: "This module introduces the concept of Vulnerability Assessments. We will review the differences between vulnerability assessments and penetration tests, how to carry out a vulnerability assessment, how to interpret the assessment results, and how to deliver an effective vulnerability assessment report." },
    { id: "98309a95-53dd-11ef-864f-bea50ffe6cb4", name: "Command Injections", img_name: "inject-with-caution", description: "Command injection vulnerabilities can be leveraged to compromise a hosting server and its entire network. This module will teach you how to identify and exploit command injection vulnerabilities and how to use various filter bypassing techniques to avoid security mitigations." },
    { id: "135d488f-138b-11ef-b18d-bea50ffe6cb4", name: "Using Web Proxies", img_name: "dive-into-requests", description: "Web application penetration testing frameworks are an essential part of any web penetration test. This module will teach you two of the best frameworks: Burp Suite and OWASP ZAP." },
    { id: "f4ab2425-ac8b-11ee-bfb6-bea50ffe6cb4", name: "Footprinting", img_name: "you-need-to-trace-before-you-can-hung", description: "This module covers techniques for footprinting the most commonly used services in almost all enterprise and business IT infrastructures. Footprinting is an essential phase of any penetration test or security audit to identify and prevent information disclosure. Using this process, we examine the individual services and attempt to obtain as much information from them as possible." },
    { id: "aecf9eb9-a8e8-11ee-bfb6-bea50ffe6cb4", name: "Shells & Payloads", img_name: "ghost-in-the-shell", description: "Gain the knowledge and skills to identify and use shells & payloads to establish a foothold on vulnerable Windows & Linux systems. This module utilizes a fictitious scenario where the learner will place themselves in the perspective of a sysadmin trying out for a position on CAT5 Security's network penetration testing team." },
    { id: "b6caf886-c8fa-11ee-891c-bea50ffe6cb4", name: "Attacking Common Services", img_name: "scan-and-execute", description: "Organizations regularly use a standard set of services for different purposes. It is vital to conduct penetration testing activities on each service internally and externally to ensure that they are not introducing security threats. This module will cover how to enumerate each service and test it against known vulnerabilities and exploits with a standard set of tools." },
    { id: "49782825-66b3-11ef-864f-bea50ffe6cb4", name: "Web Attacks", img_name: "arachnoid", description: "This module covers three common web vulnerabilities, HTTP Verb Tampering, IDOR, and XXE, each of which can have a significant impact on a company's systems. We will cover how to identify, exploit, and prevent each of them through various methods." },
    { id: "f746869c-5302-11ef-864f-bea50ffe6cb4", name: "File Upload Attacks", img_name: "prepare-your-payload-and-up-you-go", description: "Arbitrary file uploads are among the most critical web vulnerabilities. These flaws enable attackers to upload malicious files, execute arbitrary commands on the back-end server, and even take control over the entire server and all web applications hosted on it and potentially gain access to sensitive data or cause a service disruption." },
    { id: "8d0ae457-129a-11ef-b18d-bea50ffe6cb4", name: "Active Directory Enumeration & Attacks", img_name: "enumerate-and-attack", description: "Active Directory (AD) is the leading enterprise domain management suite and much more. Due to the many features and complexity of AD, it presents a large attack surface that is difficult to secure properly.As Penetration testers, having a firm grasp of what tools, techniques, and procedures are available to us for enumerating and attacking AD environments and commonly seen AD misconfigurations is a must." },
    { id: "5115fd5f-a00e-11ee-bfb6-bea50ffe6cb4", name: "Information Gathering - Web Edition", img_name: "information-is-not-knowledge-or-is-it", description: "This module equips learners with essential web reconnaissance skills, crucial for ethical hacking and penetration testing. It explores both active and passive techniques, including DNS enumeration, web crawling, analysis of web archives and HTTP headers, and fingerprinting web technologies." },
    { id: "a737567b-b631-11ef-864f-bea50ffe6cb4", name: "Server-side Attacks", img_name: "straight-to-the-server", description: "A backend that handles user-supplied input insecurely can lead to devastating security vulnerabilities such as sensitive information disclosure and remote code execution. This module covers how to identify and exploit server-side bugs, including Server-Side Request Forgery (SSRF), Server-Side Template Injection (SSTI), and Server-Side Includes (SSI) injection attacks." },
    { id: "87f29427-bdd4-11ee-a670-bea50ffe6cb4", name: "Password Attacks", img_name: "grab-the-keys-and-move-laterally", description: "Passwords are still the primary method of authentication in corporate networks. As penetration testers, we encounter passwords in many forms during our assessments. It's essential to understand how passwords are stored, how they can be retrieved, methods for cracking weak passwords, techniques for using hashes that cannot be cracked, and how to identify weak or default password usage." },
    { id: "90a4ab5b-bb99-11ef-864f-bea50ffe6cb4", name: "Session Security", img_name: "passwords-are-not-the-only-way-forward", description: "Maintaining and keeping track of a user's session is an integral part of web applications. It is an area that requires extensive testing to ensure it is set up robustly and securely. This module covers the most common attacks and vulnerabilities that can affect web application sessions, such as Session Hijacking, Session Fixation, Cross-Site Request Forgery, Cross-Site Scripting, and Open Redirects." },
    { id: "2ffcd3ab-ae4f-11ef-864f-bea50ffe6cb4", name: "Documentation & Reporting", img_name: "time-consuming-but-important", description: "Proper documentation is paramount during any engagement. The end goal of a technical assessment is the report deliverable which will often be presented to a broad audience within the target organization. We must take detailed notes and be very organized in our documentation, which will help us in the event of an incident during the assessment. This will also help ensure that our reports contain enough detail to illustrate the impact of our findings properly." },
    { id: "cad0d91d-b314-11ef-864f-bea50ffe6cb4", name: "Attacking Enterprise Networks", img_name: "all-systems-activated", description: "We must be comfortable approaching an internal or external network, regardless of the size, and be able to work through each phase of the penetration testing process to reach our goal. This module will guide students through a simulated penetration testing engagement, from start to finish, with an emphasis on hands-on testing steps that are directly applicable to real-world engagements." },
    { id: "7e8c9db4-f063-11ef-864f-bea50ffe6cb4", name: "Introduction to Windows Command Line", img_name: "look-ma-no-mouse", description: "As administrators and Pentesters, we may not always be able to utilize a graphical user interface for the actions we need to perform. Introduction to Windows Command Line aims to introduce students to the wide range of uses for Command Prompt and PowerShell within a Windows environment. We will cover basic usage of both key executables for administration, useful PowerShell cmdlets and modules, and different ways to leverage these tools to our benefit." },
    { id: "83c627b8-1b76-11f0-864f-bea50ffe6cb4", name: "Incident Handling Process", img_name: "4a11a1a1d810967184694662d629de2d/logo", description: "Security Incident handling has become a vital part of every organization's defensive strategy, as attacks constantly evolve and successful compromises are becoming a daily occurrence. In this module, we will review the process of handling an incident from the very early stage of detecting a suspicious event to confirming a compromise and responding to it." },
    { id: "a07d1000-bee0-11ef-864f-bea50ffe6cb4", name: "API Attacks", img_name: "1e00ed86f091bddcee8b422c806dceff/logo", description: "Web APIs serve as crucial connectors across diverse entities in the modern digital landscape. However, their extensive functionality also exposes them to a range of potential attacks. This module introduces API Attacks, with a specific focus on the OWASP API Security Top 10 - 2023." },
    { id: "7f67b336-cc2f-11ef-864f-bea50ffe6cb4", name: "Attacking GraphQL", img_name: "cec058aac7395d280dc0298fcca3ccca/logo", description: "GraphQL is a query language for APIs as an alternative to REST APIs. Clients are able to request data through GraphQL queries. If improperly configured or implemented, common web security vulnerabilities such as Information Disclosure, SQL Injection, and Insecure Direct Object Reference (IDOR) may arise." },
    { id: "88914c0c-d8d0-11ef-864f-bea50ffe6cb4", name: "Wi-Fi Penetration Testing Basics", img_name: "2ae3f96d7d645a21430412f2159f3dd5/logo", description: "With this widespread connectivity comes an increased risk of security vulnerabilities that can be exploited by malicious actors. As such, understanding and securing Wi-Fi networks has become a crucial aspect of cybersecurity. Whether you are an aspiring ethical hacker, a network administrator, or simply a tech enthusiast, gaining a solid foundation in Wi-Fi penetration testing is essential for safeguarding your digital environment." },
    { id: "12f437ea-dcc4-11ef-864f-bea50ffe6cb4", name: "Attacking Wi-Fi Protected Setup (WPS)", img_name: "da2f16217c0935ec61b2f0f7c429ca60/logo", description: "In this module, we delve into the intricacies of WPS, uncovering the common vulnerabilities that plague this technology. From brute-force attacks to more sophisticated exploitation techniques, we will explore how attackers compromise WPS-enabled networks. By understanding these vulnerabilities and their related attacks, you will gain the knowledge necessary to protect your networks and mitigate the risks associated with WPS." },
    { id: "eb92702f-d285-11ef-864f-bea50ffe6cb4", name: "Wired Equivalent Privacy (WEP) Attacks", img_name: "2f33d06e57137f4aade72b585435c5a9/logo", description: "In this module, we delve into Wired Equivalent Privacy (WEP) and the various attacks that can compromise it. We'll explore how to identify access points configured with WEP and demonstrate different methods to exploit its vulnerabilities. As WEP is an outdated and insecure protocol, understanding its weaknesses is crucial for recognizing the need to upgrade to more secure protocols." },
    { id: "d7a15c13-d026-11f0-9254-bea50ffe6cb4", name: "Fundamentals of AI", img_name: "32da68ec9873b8a5c48b0193bfbcf38b/logo", description: "This module provides a comprehensive guide to the theoretical foundations of Artificial Intelligence (AI). It covers various learning paradigms, including supervised, unsupervised, and reinforcement learning, providing a solid understanding of key algorithms and concepts." },
    { id: "fbc29fbd-f210-11f0-9254-bea50ffe6cb4", name: "Applications of AI in InfoSec", img_name: "5f697320187cf69c66114ff7b0c49b90/logo", description: "It covers setting up a controlled AI environment using Miniconda for package management and JupyterLab for interactive experimentation. Students will learn to handle datasets, preprocess and transform data, and implement structured workflows for tasks such as spam classification, network anomaly detection, and malware classification." },
    { id: "4722d95d-1914-11f0-864f-bea50ffe6cb4", name: "Introduction to Red Teaming AI", img_name: "7b52e002401857cbb0daeb44dad2b719/logo", description: "This module provides a comprehensive introduction to the world of red teaming Artificial Intelligence (AI) and systems utilizing Machine Learning (ML) deployments. It covers an overview of common security vulnerabilities in these systems and the types of attacks that can be launched against their components." },
    { id: "a9600702-d02c-11f0-9254-bea50ffe6cb4", name: "Prompt Injection Attacks", img_name: "0abcda60891603412bdaf90e82b1c381/logo", description: "This module comprehensively introduces one of the most prominent attacks on large language models (LLMs): Prompt Injection. It introduces prompt injection basics and covers detailed attack vectors based on real-world vulnerability reports. Furthermore, the module touches on academic research in the fields of novel prompt injection techniques and jailbreaks." },
    { id: "509e336c-a334-11ef-864f-bea50ffe6cb4", name: "Cyber Rookie 365", img_name: "60fc416b5eec425a6451aeb1e50d14e4/logo", description: "Awarded after one year of learning at HTB Academy" },
    { id: "ae8e5b7e-b95c-11f0-9254-bea50ffe6cb4", name: "Binary Duo Explorer", img_name: "0d982edba15037e6d52d54eaa7f0209a/logo", description: "Awarded after two years of learning at HTB Academy" }
];

function renderHTBAcademyBadges() {
    const container = document.getElementById('grid-academy');
    if (!container) return;

    container.innerHTML = "";

    HTBAcademyAchievements.forEach((badge, index) => {
        const badgeItem = document.createElement('div');
        badgeItem.className = `badge-item ${index > 5 ? 'extra hidden' : ''}`; //affiche 6 badges

        const shareURL = `https://academy.hackthebox.com/achievement/badge/${badge.id}`;
        const imgURL = `https://academy.hackthebox.com/storage/badges/${badge.img_name}.png`;

        badgeItem.innerHTML = `
            <div class="badge-wrapper">
                <a href="${shareURL}" target="_blank">
                    <img src="${imgURL}" alt="${badge.name}" class="badge-img">
                </a>
                <div class="badge-tooltip">${badge.description}</div>
            </div>
            <span class="badge-label">${badge.name}</span>
        `;

        container.appendChild(badgeItem);
    });
}

// Données des badges HackerOne
const h1Achievements = [
    { name: "A7: Cross-Site Scripting (XSS)", img: "./image/badge/hackerone/owasp-A7.png", desc: "Reported a valid Cross-Site Scripting (XSS) vulnerability" },
    { name: "Insecticide", img: "./image/badge/hackerone/resolved_bronze.png", desc: "First report closed as resolved" },
    { name: "Good Samaritan", img: "./image/badge/hackerone/samaritan.png", desc: "Resolved a report with a team that doesn't pay bounties" }
];

function renderH1Badges() {
    const container = document.getElementById('grid-h1');
    if (!container) return;

    h1Achievements.forEach((badge, index) => {
        const badgeItem = document.createElement('div');
        badgeItem.className = `badge-item ${index > 3 ? 'extra hidden' : ''}`;

        badgeItem.innerHTML = `
            <div class="badge-wrapper">
                <img src="${badge.img}" alt="${badge.name}" class="badge-img h1-badge-glow">
                <div class="badge-tooltip">${badge.desc}</div>
            </div>
            <span class="badge-label">${badge.name}</span>
        `;
        container.appendChild(badgeItem);
    });
}

// Données des badges CTF
const ctfHistory = [
    { name: "HackDay 2024", rank: "38", img: null, totalTeams: "117", format: "Équipe école \"0xECE\"", duration: "2 jours", writeup: "https://github.com/havard-ludovic/CTF_Write-ups/tree/main/hackday_2024", eventLink: "https://ctftime.org/event/2265" },
    { name: "UofTCTF 2026", rank: "321", img: "./image/badge/CTF/uoftctf_2026.jpg", totalTeams: "1551", format: "Solo équipe \"404_Brain_Not_Found\"", duration: "2 jours", writeup: "https://github.com/havard-ludovic/CTF_Write-ups/tree/main/UofTCTF_2026", eventLink: "https://ctftime.org/event/2969/" },
    { name: "picoCTF 2026", rank: "548", img: "./image/badge/CTF/picoctf_2026.jpg", totalTeams: "4911", format: "Solo", duration: "10 jours", writeup: null, eventLink: "https://play.picoctf.org/events/79/scoreboards" },
    { name: "TamuCTF 2026", rank: "238", img: "./image/badge/CTF/TamuCTF_2026.png", totalTeams: "697", format: "Solo équipe \"404_Brain_Not_Found\"", duration: "2 jours", writeup: "https://github.com/havard-ludovic/CTF_Write-ups/tree/main/TamuCTF_2026", eventLink: "https://ctftime.org/event/3095/" }
];

function renderCTF() {
    const container = document.getElementById('grid-ctf');
    if (!container) return;

    ctfHistory.forEach(ctf => {
        const card = document.createElement('div');
        card.className = 'ctf-item';

        const imgSrc = ctf.img || "./image/badge/CTF/ctf_default.svg";

        card.innerHTML = `
            <div class="ctf-badge-wrapper">
                <img src="${imgSrc}" alt="${ctf.name}" class="ctf-img" onclick="openModal(this.src)">
            </div>
            <div class="ctf-details">
                <a href="${ctf.eventLink}" target="_blank" class="ctf-name-link">
                    <span class="ctf-name">${ctf.name}</span>
                </a>
                
                <span class="ctf-rank-text">RANK: ${ctf.rank} / ${ctf.totalTeams}</span>
                
                <div class="ctf-stats-list">
                    <span>En ${ctf.format}</span>
                    <span>Durée : ${ctf.duration}</span>
                </div>

                <a href="${ctf.eventLink}" target="_blank" class="ctf-link">
                    [ CTF LINK ]
                </a>

                ${ctf.writeup ? `
                    <a href="${ctf.writeup}" target="_blank" class="ctf-link">
                        [ VIEW WRITE-UP ]
                    </a>
                ` : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// 4. INITIALISATION AU CHARGEMENT DU DOM
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImg");

    // --- GESTION DU ZOOM ET DÉPLACEMENT ---
    if (fullImg && modal) {
        // Empêcher le clic sur l'image de fermer la modale + Initialiser Drag
        fullImg.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - imgPosX;
            startY = e.clientY - imgPosY;
            fullImg.style.cursor = "grabbing";
            e.stopPropagation(); // Stop la propagation vers le fond noir
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            imgPosX = e.clientX - startX;
            imgPosY = e.clientY - startY;
            fullImg.style.transform = `scale(${currentScale}) translate(${imgPosX / currentScale}px, ${imgPosY / currentScale}px)`;
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            if (fullImg) fullImg.style.cursor = "zoom-in";
        });

        // Zoom molette
        modal.addEventListener("wheel", function (e) {
            e.preventDefault();
            const zoomSpeed = 0.001;
            currentScale += e.deltaY * -zoomSpeed;
            currentScale = Math.min(Math.max(0.5, currentScale), 5);
            fullImg.style.transform = `scale(${currentScale}) translate(${imgPosX / currentScale}px, ${imgPosY / currentScale}px)`;
        }, { passive: false });

        // Fermer la modale uniquement sur le fond
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- BOOT ANIMATION ---
    const body = document.body;
    body.style.overflow = 'hidden';
    setTimeout(() => {
        body.style.overflow = 'auto';
        const homeSection = document.getElementById('home');
        if (homeSection) homeSection.scrollIntoView({ behavior: 'smooth' });
    }, 3500);

    // --- TYPEWRITER ---
    const typedSpan = document.getElementById('typed');
    if (typedSpan) {
        const toType = ["Pentester", "Bug Hunter", "CTF Player"];
        let wIdx = 0, cIdx = 0, isDel = false;
        function typeEffect() {
            const currentWord = toType[wIdx];
            typedSpan.textContent = isDel ? currentWord.substring(0, cIdx - 1) : currentWord.substring(0, cIdx + 1);
            cIdx = isDel ? cIdx - 1 : cIdx + 1;
            let speed = isDel ? 50 : 150;
            if (!isDel && cIdx === currentWord.length) { isDel = true; speed = 2000; }
            else if (isDel && cIdx === 0) { isDel = false; wIdx = (wIdx + 1) % toType.length; speed = 500; }
            setTimeout(typeEffect, speed);
        }
        setTimeout(typeEffect, 4000);
    }

    // --- ÉVÉNEMENTS LOGS ---
    const btnNext = document.getElementById('nextLog');
    const btnPrev = document.getElementById('prevLog');
    if (btnNext) btnNext.addEventListener('click', () => { currentLog = (currentLog + 1) % missions.length; updateLog('next'); });
    if (btnPrev) btnPrev.addEventListener('click', () => { currentLog = (currentLog - 1 + missions.length) % missions.length; updateLog('prev'); });

    // --- BADGES HTB Academy ---
    renderHTBAcademyBadges();

    // --- BADGES HackerOne Academy ---
    renderH1Badges();

    // --- BADGES CTF ---
    renderCTF();

    // Initialisation
    updateLog('init');
});

