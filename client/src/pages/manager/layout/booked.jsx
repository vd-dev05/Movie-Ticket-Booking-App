import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Select, InputNumber, Flex } from 'antd';
import ManagerController from '@/services/manager/Manager.controller';


const CreateTicket = () => {
    // State for handling form data
    const [form] = Form.useForm();
    const [addressSeller, setAddress] = useState()
    const [role, setRole] = useState("")
    // Load form data from localStorage when the component mounts
    useEffect(() => {
        const seller = localStorage.getItem('seller')
        if (!seller || seller === null) {
            setRole('guest')
        } else {
            setRole('seller')
            const savedFormData = JSON.parse(localStorage.getItem('ticketFormData'));
            if (savedFormData) {
                form.setFieldsValue(savedFormData); // Prefill the form with saved data
            }

            const { address } = JSON.parse(localStorage.getItem('seller'))
            if (address) {
                setAddress(address)
            }

        }
    }, [form]);

    // Handle form submission
    const onFinish = async (values) => {

        try {
            if (role === 'guest') {
                message.error("You must be a seller to create a movie ! Please enter your login seller")
                return
            }
            const timeSlots = values.time.map((time) => {
                const [start_time, end_time] = time.split('-'); 
                return { startTime: start_time.trim(), endTime: end_time.trim() };
            });
            const data = {
                ...values,
                time_slots: timeSlots,
            }
            const response = await ManagerController.createMovie(data)
            if (response.status === 201) {
                message.success(response.data);
                form.resetFields();
                localStorage.removeItem('ticketFormData');
            }


        } catch (error) {
            message.error(error.message)

        }


    };

    // Handle form validation failure
    const onFinishFailed = (errorInfo) => {
        // Handle form validation error
        message.error('Please complete the form correctly!');
        console.log('Failed:', errorInfo);
    };

    // Handle form change and save to localStorage on any change
    const handleFormChange = () => {
        if (role === 'guest') {
            message.error("You must be a seller to create a movie")
            return
        }
        const currentFormData = form.getFieldsValue();
        localStorage.setItem('ticketFormData', JSON.stringify(currentFormData));
    };

    // Reset form fields and clear data from localStorage
    const resetForm = () => {
        form.resetFields();
        localStorage.removeItem('ticketFormData');
    };
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-lg">
                <h2 className="text-center text-xl font-semibold mb-6">Create Movie Ticket</h2>

                <Form
                    form={form}
                    name="create-ticket"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onValuesChange={handleFormChange} // Handle change event to save data on every form change
                >
                    {/* Movie Time */}
                    <Form.Item
                        name="time"
                        label="Movie Start Time"
                        rules={[{ required: true, message: 'Please select the movie start time!' }]}
                    >
                        <Select
                            placeholder="Select movie time"
                            className="w-full"
                            mode="multiple"
                        >
                            {/* Predefined time options */}
                            <Option value="08:00-09:00">08:00 - 09:00</Option>
                            <Option value="08:30-09:30">08:30 - 09:30</Option>
                            <Option value="09:00-10:00">09:00 - 10:00</Option>
                            <Option value="09:30-10:30">09:30 - 10:30</Option>
                            <Option value="10:00-11:00">10:00 - 11:00</Option>
                            <Option value="10:30-11:30">10:30 - 11:30</Option>
                            <Option value="11:00-12:00">11:00 - 12:00</Option>
                            <Option value="11:30-12:30">11:30 - 12:30</Option>
                            <Option value="13:00-14:00">13:00 - 14:00</Option>
                            <Option value="13:20-14:20">13:20 - 14:20</Option>
                            <Option value="13:30-14:30">13:30 - 14:30</Option>
                            <Option value="14:00-15:00">14:00 - 15:00</Option>
                            <Option value="15:00-16:00">15:00 - 16:00</Option>
                            <Option value="15:30-16:30">15:30 - 16:30</Option>
                            <Option value="16:00-17:00">16:00 - 17:00</Option>
                            <Option value="16:30-17:30">16:30 - 17:30</Option>
                            <Option value="17:00-18:00">17:00 - 18:00</Option>
                            <Option value="17:30-18:30">17:30 - 18:30</Option>
                            <Option value="18:00-19:00">18:00 - 19:00</Option>
                            <Option value="19:00-20:00">19:00 - 20:00</Option>
                            <Option value="20:00-21:00">20:00 - 21:00</Option>
                            <Option value="20:30-21:30">20:30 - 21:30</Option>
                            <Option value="21:00-22:00">21:00 - 22:00</Option>
                            <Option value="21:30-22:30">21:30 - 22:30</Option>
                            <Option value="22:00-23:00">22:00 - 23:00</Option>
                            <Option value="22:30-23:30">22:30 - 23:30</Option>
                            <Option value="23:00-24:00">23:00 - 24:00</Option>
                        </Select>
                    </Form.Item>

                    {/* Movie ID */}
                    <Form.Item
                        name="movieId"
                        label="Movie ID"
                        rules={[{ required: true, message: 'Please enter the movieId!' }]}
                    >
                        <Input placeholder="Enter movie Id" className="w-full" />
                    </Form.Item>

                    {/* Price */}
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter the ticket price!' }]}
                    >
                        <InputNumber
                            placeholder="Enter price"
                            className="w-full"
                            min={0.01} // Minimum price (can be decimal)
                            step={0.01} // Step for decimal precision
                            addonBefore="$" // Currency symbol
                            precision={2} // Decimal precision (2 decimal places)
                        />
                    </Form.Item>

                    {/* Cinema Address */}
                    <Form.Item
                        name="address"
                        label="Cinema Address"
                        rules={[{ required: true, message: 'Please enter the cinema address!' }]}

                    >

                        <Input placeholder="Enter cinema address" className="w-full" />
                    </Form.Item>
                    <p>Địa chỉ của bạn: {addressSeller}</p>
                    {/* seller manager */}
                    <Form.Item
                        name="sellerId"
                        label="Loại Rạp"

                        rules={[{ required: true, message: 'Vui lòng chọn loại rạp' }]}
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Chọn rạp"
                        >
                            <Option key="CGV">CGV</Option>
                            <Option key="LOTTE">LOTTE</Option>
                            <Option key="BETA">BETA</Option>
                            <Option key="BHD">BHD</Option>
                            <Option key="Galaxy">Galaxy</Option>
                        </Select>
                    </Form.Item>
                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Create Ticket
                        </Button>
                    </Form.Item>

                    {/* Reset Button */}
                    <Form.Item>
                        <Button type="default" onClick={resetForm} className="w-full">
                            Reset Form
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default CreateTicket;
