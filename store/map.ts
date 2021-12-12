import { Module, VuexModule, Mutation, Action, config } from 'vuex-module-decorators';

config.rawError = true;

export type Prefectures = {
  name: string;
  code: string;
  isChecked: boolean;
}[];

const DEFAULT_COLOR = {
  base: '#e3f2fd',
  visited: '#f8bbd0',
  hover: '#f8bbd0',
  stroke: '#d32f2f',
};

export type MapColors = {
  base: string;
  visited: string;
  hover: string;
  stroke: string;
};

@Module({
  name: 'map',
  stateFactory: true,
  namespaced: true,
})
export default class Map extends VuexModule {
  /** 都道府県情報 */
  private prefectures: Prefectures = [];

  /** 都道府県ごとのMap SVGエレメント */
  private prefsSvgEls: SVGElement[] = [];

  /** SVG Mapロード状態 */
  private isMapLoaded = false;

  /** マップカラー */
  private colors: MapColors = DEFAULT_COLOR;

  get getPrefectures() {
    return this.prefectures;
  }

  get getPrefsSvgEls() {
    return this.prefsSvgEls;
  }

  get mapLoaded(): boolean {
    return this.isMapLoaded;
  }

  get getColors() {
    return this.colors;
  }

  get getMapNode() {
    // TODO: 仮
    return document.getElementById('map-wrapper');
  }

  get isPrefVisited() {
    return (code: string) => {
      return this.prefectures.find((e) => e.code === code)!.isChecked;
    };
  }

  @Mutation
  private SET_PREFECTURES(prefectures: Prefectures) {
    this.prefectures = prefectures;
  }

  @Mutation
  private SET_PREFS_SVGELS(prefsSvgEls: SVGElement[]) {
    this.prefsSvgEls = prefsSvgEls;
  }

  @Mutation
  private CHANGE_MAP_LOADED(isLoaded: boolean) {
    this.isMapLoaded = isLoaded;
  }

  @Mutation
  private FILL_PREFECTURE(params: { code: string; color: string }) {
    const { code, color } = params;
    const svgEl = this.prefsSvgEls.find((e) => e.dataset.code === code);
    if (svgEl) {
      svgEl.style.fill = color;
    }
  }

  @Mutation
  private TOGGLE_PREFECTURE(code: string) {
    const pref = this.prefectures.find((e) => e.code === code);
    if (pref) {
      pref.isChecked = !pref.isChecked;
    }
  }

  @Mutation
  private RESET_MAP() {
    this.prefectures.forEach((e, i) => {
      e.isChecked = false;
      this.prefsSvgEls[i].style.fill = this.colors.base;
    });
  }

  @Mutation
  private FILL_ALL() {
    this.prefectures.forEach((e, i) => {
      e.isChecked = true;
      this.prefsSvgEls[i].style.fill = this.colors.visited;
    });
  }

  @Mutation
  private CHANGE_COLOR(params: { target: keyof MapColors; color: string }) {
    const { target, color } = params;
    this.colors[target] = color;
  }

  @Mutation
  private RESET_COLOR() {
    this.colors = Object.assign({}, this.colors, DEFAULT_COLOR);
  }

  @Action
  setPrefectures(prefectures: Prefectures) {
    this.SET_PREFECTURES(prefectures);
  }

  @Action
  setPrefsSvgEls(prefsSvgEls: SVGElement[]) {
    this.SET_PREFS_SVGELS(prefsSvgEls);
  }

  @Action
  changeMapLoaded(isLoaded: boolean) {
    return this.CHANGE_MAP_LOADED(isLoaded);
  }

  @Action
  fillPrefecture(params: { code: string; color: string }) {
    this.FILL_PREFECTURE(params);
  }

  @Action
  togglePrefecture(code: string) {
    this.TOGGLE_PREFECTURE(code);
  }

  @Action
  resetMap() {
    this.RESET_MAP();
  }

  @Action
  fillAll() {
    this.FILL_ALL();
  }

  @Action
  changeColor(params: { target: keyof MapColors; color: string }) {
    this.CHANGE_COLOR(params);
  }

  @Action
  resetColor() {
    this.RESET_COLOR();
  }
}
