pragma solidity ^0.4.0;

contract BlockFoodDemo {

    enum OrderStatus {Unset, Submitted, Accepted, Ready, Picking, Delivering, Done}

    struct Order {
        uint id;
        address customer;
        address restaurant;
        address courier;
        OrderStatus status;
    }

    struct OrderDetails {
        uint id;
        uint restaurantPayment;
        uint courierPayment;
    }

    uint[] public ordersIds;
    mapping(uint => Order) public orders;
    mapping(uint => OrderDetails) public ordersDetails;

    event OrderUpdate(uint orderId, OrderStatus status);

    modifier onlyNewDemo(uint orderId) {
        require(orders[orderId].status == OrderStatus.Unset);
        require(orders[orderId].customer == 0x0);
        _;
    }

    modifier onlyCustomer(uint orderId, address customer) {
        require(orders[orderId].customer == customer);
        _;
    }
    modifier onlyRestaurant(uint orderId, address restaurant) {
        require(orders[orderId].restaurant == restaurant);
        _;
    }
    modifier onlyCourier(uint orderId, address courier) {
        require(orders[orderId].courier == courier);
        _;
    }

    modifier onlyValidDetails(uint total, uint restaurantPayment, uint courierPayment) {
        require(total == restaurantPayment + courierPayment);
        _;
    }

    modifier checkOrderStatus(uint orderId, OrderStatus status) {
        require(orders[orderId].status == status);
        _;
    }

    function BlockFoodDemo() public {
    }

    function newDemo(
        uint orderId
    )
    public onlyNewDemo(orderId)
    {
        orders[orderId] = Order(orderId, msg.sender, 0x0, 0x0, OrderStatus.Unset);
        ordersIds.push(orderId);
        OrderUpdate(orderId, OrderStatus.Unset);
    }

    function submit(
        uint orderId,
        address restaurant,
        uint restaurantPayment,
        uint courierPayment
    )
    public
    payable
    onlyCustomer(orderId, msg.sender)
    onlyValidDetails(msg.value, restaurantPayment, courierPayment)
    checkOrderStatus(orderId, OrderStatus.Unset)
    {
        orders[orderId].restaurant = restaurant;
        orders[orderId].status = OrderStatus.Submitted;
        ordersDetails[orderId] = OrderDetails(orderId, restaurantPayment, courierPayment);
        OrderUpdate(orderId, OrderStatus.Submitted);
    }

    function accept(
        uint orderId
    )
    public
    onlyRestaurant(orderId, msg.sender)
    checkOrderStatus(orderId, OrderStatus.Submitted)
    {
        orders[orderId].status = OrderStatus.Accepted;
        OrderUpdate(orderId, OrderStatus.Accepted);
    }

    function ready(
        uint orderId
    )
    public
    onlyRestaurant(orderId, msg.sender)
    checkOrderStatus(orderId, OrderStatus.Accepted)
    {
        orders[orderId].status = OrderStatus.Ready;
        OrderUpdate(orderId, OrderStatus.Ready);
    }

    function picking(
        uint orderId
    )
    public
    checkOrderStatus(orderId, OrderStatus.Ready)
    {
        orders[orderId].courier = msg.sender;
        orders[orderId].status = OrderStatus.Picking;
        OrderUpdate(orderId, OrderStatus.Picking);
    }

    function delivering(
        uint orderId
    )
    public
    onlyCourier(orderId, msg.sender)
    checkOrderStatus(orderId, OrderStatus.Picking)
    {
        orders[orderId].status = OrderStatus.Delivering;
        OrderUpdate(orderId, OrderStatus.Delivering);
    }

    function done(
        uint orderId
    )
    public
    onlyCourier(orderId, msg.sender)
    checkOrderStatus(orderId, OrderStatus.Delivering)
    {
        orders[orderId].status = OrderStatus.Done;
        OrderUpdate(orderId, OrderStatus.Done);

        uint restaurantPayment = ordersDetails[orderId].restaurantPayment;
        uint courierPayment = ordersDetails[orderId].courierPayment;

        ordersDetails[orderId].restaurantPayment = 0;
        ordersDetails[orderId].courierPayment = 0;

        orders[orderId].restaurant.transfer(restaurantPayment);
        orders[orderId].courier.transfer(courierPayment);
    }
}
