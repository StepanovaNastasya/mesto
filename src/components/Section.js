export class Section {
  constructor(renderList, containerSelector) {
    const {items, renderer} = renderList;

    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderAll() {
    this.items.forEach(item => {
      this.addItem(this.renderer(item));
    });
  }

  addItem(item) {
    this.container.append(item);
  }

  prependItem(item) {
    this.container.prepend(item);
  }
}