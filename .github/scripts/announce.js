
const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        channel: "#app-livraison",
        text: `Déploiement terminé du projet mobile (${process.env.BRANCH_NAME}) sur : ${process.env.URL.replace('"', '').replace('\"', '')}`
    })
};

fetch(process.env.SLACK_WEBHOOK_URL, requestOptions)
