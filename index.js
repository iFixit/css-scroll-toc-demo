const timelines = [];

function addAnimation(id) {
    const tocLink = document.querySelector(`a[href="#${id}"]`);
    if (!tocLink) return;
    const target = document.querySelector(`section:has(#${id})`);
    if (!target) return;
    const cleanedId = id.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const timelineName = `--${cleanedId}-timeline`;
    timelines.push(timelineName);
    document.body.style = `timeline-scope: ${timelines.join(", ")}`

    tocLink.className = "animated"
    tocLink.style.setProperty('--timelineName', timelineName);
    target.style.viewTimelineName = timelineName;
}

function sectionBody() {
    let current = [];
    const children = [...document.body.children]
    children.forEach(el => {
        if (el.tagName === 'H2') {
            if (current.length) {
                const section = document.createElement('section');
                section.className = 'section';
                current.forEach(el => section.appendChild(el));
                document.body.appendChild(section);
            }
            current = [];
        }
        current.push(el);
    })

}

document.addEventListener('DOMContentLoaded', () => {
    sectionBody();

    document.querySelectorAll('.toc > a').forEach(el => {
        const id = el.href.split('#')[1];
        addAnimation(id);
    });
})