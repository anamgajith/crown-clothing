import React from 'react';
import CollectionItem from '../collection-item/collection-item-component'
import './preview-collection.styles.scss';

const PreviewCollection = ({title,items}) => (
    <div className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {
                items
                .filter((iem,idx) => idx < 4)
                .map(({id,...otherCollectionProps}) => (
                    <CollectionItem key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    </div>
);

export default PreviewCollection;