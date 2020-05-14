//https://github.com/reduxjs/reselect#createselectorinputselectors--inputselectors-resultfunc
// createSelector takes one or more selectors, or an array of selectors, computes their values and passes them as arguments to resultFunc.
// createSelector determines if the value returned by an input-selector has changed between calls using reference equality (===). Inputs to selectors created with createSelector should be immutable.
// Selectors created with createSelector have a cache size of 1. This means they always recalculate when the value of an input-selector changes, as a selector only stores the preceding value of each input-selector.

import { createSelector } from 'reselect'


const selectShop = state => state.shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

//change the object that contains all of the items into an array so it can be mapped through in collection-overview component
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectionUrlParam => 
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  )