import withSubscription from "./withSubscription"
import {products} from  "../constant/constant"
import {users} from  "../constant/constant"
import ProductList from "./Product"
import UserList from "./User";

export default function About() {
    const UserListV = withSubscription(UserList, users, "User List");
    const ProductListV = withSubscription(ProductList, products, "Product List");
  return (
    <div className="container">
        <div className="col">
            <UserListV/>
        </div>
        <div className="col">
            <ProductListV/>
        </div>
    </div>
  );
}
