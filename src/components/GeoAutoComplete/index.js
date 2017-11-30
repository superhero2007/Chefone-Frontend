import React from 'react';
import Geosuggest from 'react-geosuggest';
import './index.less';

var App = React.createClass({
  render: function() {
    const { value } = this.props;

    const location = new google.maps.LatLng(52.52437, 13.41053); // eslint-disable-line

    return (
      <div>
        <Geosuggest
          types={['geocode']}
          initialValue={value}
          location={location}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          radius="20"
        />
      </div>
    );
  },
  onChange: function(value) {
    console.log('input changes to :' + value);
  },
  onSuggestSelect: function(suggest) {
    if (this.props.onChange) {
      this.props.onChange(suggest);
    }
  },
});

export default App;
