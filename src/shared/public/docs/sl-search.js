setTimeout(() => {
    // Input elemanını oluştur ve özelliklerini ayarla
    const searchInput = document.createElement("input");
    searchInput.setAttribute("name", "searchInput");
    searchInput.setAttribute("id", "searchInput");
    searchInput.setAttribute("placeholder", "Search");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute(
        "style",
        "width: calc(100% - 10px);padding: 5px;margin: 10px 5px;border: 1px solid #4e4e4e;border-radius: 5px;"
    );

    // Oluşturulan input elemanını belirtilen yere ekle
    const targetElement =
        document.querySelector("[id='sl-toc-/']").parentElement.parentElement;
    targetElement.parentElement.insertBefore(searchInput, targetElement);

    // Input elemanına click eventi ekle
    searchInput.addEventListener("click", function () {
        searchInput.focus();
    });

    // Input elemanına keyup eventi ekle
    searchInput.addEventListener("keyup", function () {
        const search = searchInput.value.toLowerCase();
        const elements = targetElement.children;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const text = element.textContent.toLowerCase();
            if (text.includes(search)) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
            const childElements = element.children;
            for (let j = 0; j < childElements.length; j++) {
                const childElement = childElements[j];
                const childText = childElement.textContent.toLowerCase();
                if (childText.includes(search)) {
                    childElement.style.display = "";
                } else {
                    childElement.style.display = "none";
                }
                const grandChildElements = childElement.children;
                for (let k = 0; k < grandChildElements.length; k++) {
                    const grandChildElement = grandChildElements[k];
                    const grandChildText =
                        grandChildElement.textContent.toLowerCase();
                    if (grandChildText.includes(search)) {
                        grandChildElement.style.display = "";
                    } else {
                        grandChildElement.style.display = "none";
                    }
                }
            }
        }
    });
}, 100);
