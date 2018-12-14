import * as React from 'react';
import { connect, AnyAction } from 'react-redux';
import * as actions from '../../../storage/actions';
import axioss from '../../../storage/helpers/axios-wrapper';
// const axioss = require('../../../storage/helpers/axios-wrapper');

export interface ICakeItem { name: string; value: any; }
export interface IHelloProps {
    list: Array<ICakeItem>;
    loadItems: () => Promise<void>; 
}

class TestPage extends React.Component<IHelloProps, any> {
    state = {
        name: "Aleks",
        //list: new Array<CakeItem>(),
    }

    componentDidMount(){
        this.props.loadItems();
    }

    public render() {
        return (
            <div>
              <h1>This is Test</h1>
                <ul>
                {this.props.list.map((item, i) => <li key={i}>{item.name} {item.value}</li>)}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadItems: () => dispatch(actions.itemActions.taskFetch())
    };
}

const mapStateToProps = (state) => {
    return {
        list: state.item.tasks,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
