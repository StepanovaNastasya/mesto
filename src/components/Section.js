export class Section {
  constructor(renderList, containerSelector) {
    const {items, renderer} = renderList;

    this.items = items;
    this.renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }

  renderAll() {
    return this.items.map(item => {
      return this.renderer(item);
    });
  }

  addItem(item) {
    this.container.append(item);
  }
}