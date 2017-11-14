function toggleShow() {
	document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function frontBitToDec(bitNb) {
	dec = 0;
	for (j=1;j<=bitNb;j++) {
		dec += Math.pow(2,8-j);
	}
	return dec;
}

function getIPfromMask(maskBit) {
	var ipStr = "";
	var countPrintGroup = 4;
	while (maskBit > 0) {
		if (maskBit > 8) {
			ipStr += frontBitToDec(8);
			maskBit -= 8;
		}else{
			ipStr += frontBitToDec(maskBit);
			maskBit = 0;
		}
		countPrintGroup --;
		if (countPrintGroup > 0) {
			ipStr += ".";
		}
	}
	while (countPrintGroup > 0) {
		ipStr += "0";
		if (countPrintGroup > 1) {
			ipStr += ".";
		}
		countPrintGroup --;
	}
	return ipStr;
}

function createdSelectChoices() {
	for (var mask = 32; mask > 0; mask--) {
		var ip_text = getIPfromMask(mask);
		var op = document.createElement("option");
		op.setAttribute("value",mask);
		var node = document.createTextNode(ip_text + " /" + mask);
		op.appendChild(node);
		var element = document.getElementById("subnet");
		element.appendChild(op);
	}
}

function correctIPPattern(ip) {
	var ipList = ip.split(".");
	if (ipList.length != 4) {
		return false;
	}
	for (var i in ipList) {
		var iInt = parseInt(i);
		if (0 > iInt || 255 < iInt){
			return false;
		}
	}
	return true;
}

function findNetworkClass(ip) {
	var firstOctet = parseInt(ip.split(".")[0]);
	if (firstOctet >= 1 && firstOctet <= 126) {
		return 'A';
	}else if (firstOctet >= 128 && firstOctet <= 191) {
		return 'B';
	}else if (firstOctet >= 192 && firstOctet <= 223) {
		return 'C';
	}else if (firstOctet >= 224 && firstOctet <= 239) {
		return 'D';
	}else if (firstOctet >= 240 && firstOctet <= 254) {
		return 'E';
	}else 
		return 'NaN';
}

function findBinaryIP(ip) {
	var ipList = ip.split(".");
	var binStr = "";
	var countDot = 0;
	for (var i = 0; i < ipList.length; i++) {
		var tmp = parseInt(ipList[i]);
		var nowBinStr = "";
		tmp = parseInt(tmp);
		while (tmp > 0) {
			nowBinStr = (tmp % 2) + nowBinStr;
			tmp = Math.floor(tmp/2);
		}
		while (nowBinStr.length < 8) {
			nowBinStr = "0" + nowBinStr;
		}
		binStr += nowBinStr;
		if (countDot < 3) {
			binStr += '.';
			countDot += 1;
		}
	}
	return binStr;
}

function findNbUsable(nbHost) {
	if (nbHost < 2) {
		return 0;
	} else {
		return nbHost -2;
	}
}

function binToDec(bin) {
	var dec = 0;
	for (var i in bin) {
		dec = dec*2 + parseInt(bin[i]);
	}
	return dec;
}

function findDecIP(ip) {
	var ipList = ip.split(".");
	var decIP = "";
	var dotCount = 0;
	for (var i in ipList) {
		decIP += binToDec(ipList[i]);
		if (dotCount < 3) {
			decIP += ".";
			dotCount ++;
		}
	}
	return decIP;
}

function plusIP(ip,value) {
	ipList = ip.split(".");
	for (var i in ipList) {
		ipList[i] = parseInt(ipList[i]);
	}
	for (var i = ipList.length -1; i >= 0; i--) {
		ipList[i] += value;
		if (ipList[i] > 255) {
			value = Math.floor(ipList[i] / 256);
			ipList[i] = ipList[i] % 256;
		} else {
			break;
		}
	}
	return ipList.join(".");
}

function minusIP(ip,value) {
	ipList = ip.split(".");
	for (var i in ipList) {
		ipList[i] = parseInt(ipList[i]);
	}
	for (var i = ipList.length -1; i >= 0; i--) {
		ipList[i] -= value;
		if (ipList[i] < 0) {
			value = Math.ceiling(Math.abs(ipList[i]) / 256);
			ipList[i] = value*256 + ipList[i];
		} else {
			break;
		}
	}
	return ipList.join(".");
}

function findNetworkAddress(binIP, binSubnetMask) {
	var networkAddr = "";
	for (var i = 0; i < binIP.length; i++) {
		if (binIP[i] == binSubnetMask[i] && binIP[i] == ".") {
			networkAddr += ".";
		}else if (binSubnetMask[i] == "1") {
			networkAddr += binIP[i];
		}else if (binSubnetMask[i] == "0") {
			networkAddr += "0";
		}
	}
	networkAddr = findDecIP(networkAddr);
	return networkAddr;
}

function invertIP(ip) {
	inIP = "";
	for (var i in ip) {
		if (ip[i] == "1") {
			inIP += "0";
		} else if (ip[i] == "0") {
			inIP += "1";
		} else {
			inIP += ip[i];
		}
	}
	return inIP;
}

function findType(ip) {
	ipList = ip.split(".");
	for (var i in ipList) {
		ipList[i] = parseInt(ipList[i]);
	}
	if (ipList[0] == 192 && ipList[1] == 168) {
		return "Private";
	} else if (ipList[0] == 127 && ipList[1] == 0 && ipList[2] == 0 && ipList[3] == 1) {
		return "Private";
	} else if (ipList[0] == 10) {
		return "Private";
	} else if (ipList[0] == 172 && ipList[1] >= 16 && ipList[1] <= 31) {
		return "Private";
	}
	return "Public";
}

function submit() {
	var networkClass = document.querySelector('[name="networkClass"]:checked').value;
	var subnet = document.getElementsByName("subnet")[0].value;
	var ip = document.getElementsByName("ip")[0].value;
	//console.log("ip: " + ip);
	//console.log("networkClass: " + networkClass);
	//console.log("subnet: " + subnet);
	if (!correctIPPattern(ip)) {
		alert("Incorrect IP pattern");
	}else{
		var ipClass = findNetworkClass(ip);
		var binIP = findBinaryIP(ip);
		var subnetMask = getIPfromMask(subnet);
		var binIP = findBinaryIP(ip);
		var binSubnetMask = findBinaryIP(subnetMask);
		var binWildcardIP = invertIP(binSubnetMask);
		var wildcardIP = findDecIP(binWildcardIP);
		var networkAddr = findNetworkAddress(binIP, binSubnetMask);
		var CIDR = "/" + subnet;
		var nbHosts = Math.pow(2,32-subnet);
		var nbUsable = findNbUsable(nbHosts);
		var short = ip + "/" + subnet;
		var broadcastAddr = plusIP(networkAddr,nbHosts-1);
		var usableRange = plusIP(networkAddr,1) + " - " + minusIP(broadcastAddr,1);
		var ipType = findType(ip);
		var binID = binIP.split(".").join("");
		var decID = binToDec(binID);

		console.log("IP Address: " + ip);
		console.log("Network Address: " + networkAddr);
		console.log("Usable Host IP Range: " + usableRange);
		console.log("Broadcast Address: " + broadcastAddr);
		console.log("Total Number of Hosts: " + nbHosts);
		console.log("Number of Usable Hosts: " + nbUsable);
		console.log("Subnet Mask: " + subnetMask);
		console.log("Wildcard Mask: " + wildcardIP);
		console.log("Binary Subnet Mask: " + binSubnetMask);
		console.log("IP Class: " + ipClass);
		console.log("CIDR Notation: " + CIDR);
		console.log("IP Type: " + ipType);
		console.log("Short: " + short);
		console.log("Binary ID: " + binID);
		console.log("integer ID: " + decID);
	}
}