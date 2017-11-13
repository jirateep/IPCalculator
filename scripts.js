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
			nowBinStr += tmp % 2;
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

function submit() {
	var networkClass = document.querySelector('[name="networkClass"]:checked').value;
	var subnet = document.getElementsByName("subnet")[0].value;
	var ip = document.getElementsByName("ip")[0].value;
	console.log("networkClass : " + networkClass);
	console.log("subnet : " + subnet);
	console.log("ip : " + ip);
	if (!correctIPPattern(ip)) {
		alert("Incorrect IP pattern");
	}else{
		var ipNetworkClass = findNetworkClass(ip);
		var binIP = findBinaryIP(ip);
		console.log("ipNetworkClass : " + ipNetworkClass);
		console.log("binaryIP : " + binIP);
	}
}