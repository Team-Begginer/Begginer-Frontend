const backendLink = 'https://fd9d-211-244-186-39.jp.ngrok.io';
const header = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

const ItemList = document.querySelector('.list');
function getListItem() {
	fetch(`${backendLink}/require`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	})
		.then((response) => response.json())
		.then((data) => console.log(data));
}

function accessCert() {
	if (localStorage.getItem('access-token') == undefined) {
		location.href = 'LoginPage.html';
	}
}
accessCert();
getListItem();
