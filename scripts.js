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

function createdDropdownChoices() {
	var para = document.createElement("p");
	var node = document.createTextNode("This is new.");
	para.appendChild(node);
	var element = document.getElementById("myDropdown");
	element.appendChild(para);
}