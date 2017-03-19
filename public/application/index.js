var Button = ReactBootstrap.Button;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;

var Application = React.createClass({
    getInitialState: function() {
        return {
            email: "",
            password: ""
        }
    },
    handleChange: function(e) {
        this.setState({[e.target.name]:e.target.value});
    },
    submitInput: function(e) {
//        $.ajax({
//                    url: path + "/update",
//                    dataType: 'json',
//                    contentType: "application/json; charset=utf-8",
//                    type: 'POST',
//                    data: JSON.stringify(dataForm),
//                    processData: false,
//                    success: function(data) {
//                        this.setState({data: data});
//                    }.bind(this),
//                    error: function(xhr, status, err) {
//                        console.error(path + "/update", status, err.toString());
//                    }.bind(this)
//                });
    },
    render: function() {
        return <div className="content">
                    <img src="/images/logo.jpg" className="logo"/>
                    <h1>BLUBERRY</h1>
                    <FormGroup controlId="formValidationSuccess1" validationState="success">
                        <FormControl type="text" placeholder="Email" className="index-input" name="email" onChange={this.handleChange} value={this.state.email} />
                        <FormControl type="password" placeholder="Password" className="index-input" name="password" onChange={this.handleChange} value={this.state.password} />
                        <Button bsStyle="primary" className="index-input" onClick={this.submitInput}>Login</Button>
                    </FormGroup>
               </div>;
    }
});

ReactDOM.render(<Application />, document.getElementById('content'));