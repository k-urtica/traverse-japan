/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Map from '@/store/map';

let MapModule: Map;

function initialiseStores(store: Store<any>): void {
  MapModule = getModule(Map, store);
}

export { initialiseStores, MapModule };
