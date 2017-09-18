import React, { Component } from 'react';
import '../styles/display.css';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // pages: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (this.state.colorCount !== nextProps.colorCount) {
    //   this.setState({
    //     colorCount: nextProps.colorCount
    //   });
    // }
  }

  componentDidMount() {
    // console.log('outside');
    // if (this.state.colorCount) {
    //   console.log('inside');
    //   const pages = createPageLis(res.data.count);
    //
    //   this.setState({ pages }, () => {
    //     console.log(this.stage.pages);
    //   });
    // }
  }

  render () {
    return (
      <ul className="pagination-ul">
        {
          this.props.pages ?
            this.props.pages.map(item => item)
            : null
        }
      </ul>
    );
  }
};

export { Pagination };
