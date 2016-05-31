import React from 'react';
var MyComponentList = React.createClass({
    render: function() {
        var items = this.props.data.map(function(item, index) {
            return (
                <tr><td>{item.name}</td>
                    <td>{item.id}</td>
                    <td>{item.filePath}</td>
                </tr>
            );
        });
        return (
            <div className="my-list">
                {(this.props.data.length>0)?<table>
                        <tr>
                            <th>Form Name</th><th> Form Id </th><th>File path</th>
                        </tr>
                            {items}
                    </table>:''}
            </div>
        );
    }
});

export default MyComponentList;