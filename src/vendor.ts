function loadPureCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/purecss@2.0.5/build/pure-min.css";
    link.integrity = "sha384-LTIDeidl25h2dPxrB2Ekgc9c7sEC3CWGM6HeFmuDNUjX76Ert4Z4IY714dhZHPLd";
    link.crossOrigin = "anonymous";
    document.head.append(link);
    const meta = document.createElement("meta");
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.head.append(meta);
}

function loadVendor() {
    loadPureCSS();
}

loadVendor();
