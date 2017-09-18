import React, { Component } from 'react';
import '../styles/display.css';

import { Link } from 'react-router-dom';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
            this.props.pages.map(page => {
              let liClass = `pagination-link ${page === this.props.curPage ? 'pagination-active' : null}`;

              return <Link
                className={liClass}
                key={page}
                to={`/colors/${page}`}
              >
                <li>
                  {page}
                </li>
              </Link>
            })
            : null
        }
      </ul>
    );
  }
};

export { Pagination };
