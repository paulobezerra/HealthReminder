// Definir textos traduzidos para os elementos
document.getElementById('title').textContent = chrome.i18n.getMessage('popupTitle');
document.getElementById('popupTitle').textContent = chrome.i18n.getMessage('popupTitle');
document.getElementById('intervalLabel').textContent = chrome.i18n.getMessage('intervalLabel');
document.getElementById('save').textContent = chrome.i18n.getMessage('saveButton');

document.getElementById('save').addEventListener('click', () => {
    const interval = parseInt(document.getElementById('interval').value);
    if (interval > 0) {
        chrome.storage.sync.set({interval: interval}, () => {
            alert(chrome.i18n.getMessage('saveSuccess', [interval]));
            chrome.runtime.sendMessage({action: 'updateInterval'});
        });
    } else {
        alert(chrome.i18n.getMessage('invalidInterval'));
    }
});

// Carrega o intervalo salvo (se houver)
chrome.storage.sync.get(['interval'], (result) => {
    if (result.interval) {
        document.getElementById('interval').value = result.interval;
    }
});

// Depuração: Verifica se as mensagens estão sendo carregadas
chrome.i18n.getAcceptLanguages().then((languages) => {
    console.log('Idioma detectado:', languages);
    console.log('popupTitle:', chrome.i18n.getMessage('popupTitle'));
    console.log('intervalLabel:', chrome.i18n.getMessage('intervalLabel'));
    console.log('saveButton:', chrome.i18n.getMessage('saveButton'));
})