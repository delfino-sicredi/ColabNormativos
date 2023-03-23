export default class Colab {
    private body: HTMLElement | null;

    constructor(prop: Document) {
        this.body = prop.getElementById('abrangencia');
    }

   alertValue() {
        alert((this.body as HTMLInputElement)?.value);
    }

}