
var cartona = ``;
var CurrentIndex;
var AllDataInTable = [];



if (localStorage.getItem("Data") != null) {
    AllDataInTable = JSON.parse(localStorage.getItem("Data"))
    Display(AllDataInTable);
}

function AddNewWebsite() {

    var objData = {
        Name: document.getElementById("BookmarkName").value,
        URLs: document.getElementById("WebSiteURL").value,
        ID: AllDataInTable.length
    }
    console.log(AllDataInTable.length)
    AllDataInTable.push(objData);
    UpdateLocalStorage();
    UpdateInputs();
    Display(AllDataInTable);

}


function Display(items) {

    for (let i = 0; i < items.length; i++) {

        cartona += ` <tr>
        <td>${i + 1}</td>
        <td>${items[i].Name}</td>
        <td>
            <button class="btn btn-danger" onclick=" VisitWebSite(${items[i].ID})">Visit

            </button>
        </td>

        <td>
            <button class="btn btn-danger"onclick=" DeleteElement(${i})">Delete

            </button>
        </td>

                <td>
            <button class="btn btn-danger"onclick=" GetDataToUpdate(${items[i].ID})">update

            </button>
        </td>
    </tr>`
    }

    document.getElementById("RowData").innerHTML = cartona;

    cartona = ``;

}

function UpdateInputs(obj) {
    document.getElementById("BookmarkName").value = obj ? obj.Name : null;
    document.getElementById("WebSiteURL").value = obj ? obj.URLs : null;
}


function DeleteElement(DeletedIndex) {

    AllDataInTable.splice(DeletedIndex, 1);
    UpdateLocalStorage();
    Display(AllDataInTable);



}


function GetDataToUpdate(index) {
    CurrentIndex = index;
    UpdateInputs(AllDataInTable[index])

    document.getElementById("Addbtn").classList.add("d-none")
    document.getElementById("Updatebtn").classList.remove("d-none")

}
function UpdateValue() {


    AllDataInTable[CurrentIndex].Name = document.getElementById("BookmarkName").value;
    AllDataInTable[CurrentIndex].URLs = document.getElementById("WebSiteURL").value;

    document.getElementById("Addbtn").classList.remove("d-none")
    document.getElementById("Updatebtn").classList.add("d-none")
    UpdateLocalStorage();
    Display(AllDataInTable);
    UpdateInputs();
}

function UpdateLocalStorage() {
    localStorage.setItem("Data", JSON.stringify(AllDataInTable));
}

function Search(SearchValue) {

    var SearchItems = [];
    for (var i = 0; i < AllDataInTable.length; i++) {
        if (AllDataInTable[i].Name.toLowerCase().includes(SearchValue.value.toLowerCase())) {
            SearchItems.push(AllDataInTable[i]);
        }
    }

    Display(SearchItems);


}

function VisitWebSite(Index) {
    var url = AllDataInTable[Index].WebsiteURL;

    window.open(url, '_blank')
}


function ValidateWebSite(element) {

    var Regex = {
        BookmarkName: /^[A-Z][a-z0-9]{5,8}$/,
        WebSiteURL: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/
    }

    if (Regex[element.id].test(element.value) == true) {
        element.nextElementSibling.classList.add("d-none")
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
    } else {
        element.nextElementSibling.classList.remove("d-none")
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
    }



}