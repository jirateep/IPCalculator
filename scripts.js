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
	for (var mask = 1; mask <= 32; mask++) {
		var ip_text = getIPfromMask(mask);
		var op = document.createElement("option");
		var node = document.createTextNode(ip_text + " /" + mask);
		op.appendChild(node);
		var element = document.getElementById("subnet");
		element.appendChild(op);
	}
}

createdSelectChoices();