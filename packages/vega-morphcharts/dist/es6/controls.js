/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/
import { createElement } from 'tsx-create-element';
const KeyCodes = {
    ENTER: 'Enter',
};
export const Table = (props) => {
    return (createElement("table", { className: props.className },
        props.children,
        props.rows.map((row, i) => (createElement("tr", { className: props.rowClassName || '', onClick: e => props.onRowClick && props.onRowClick(e, i), tabIndex: props.onRowClick ? 0 : -1, onKeyUp: e => {
                if (e.key === KeyCodes.ENTER && props.onRowClick) {
                    props.onRowClick(e, i);
                }
            } }, row.cells.map((cell, i) => (createElement("td", { className: cell.className || '', title: cell.title || '' }, cell.content))))))));
};
