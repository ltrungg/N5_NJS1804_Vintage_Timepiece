import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Avatar, Card, Typography, Button, Input, Rate, Tooltip, Pagination } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ViewSellerProfile = () => {
  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;
  const { id } = useParams();
  const [seller, setSeller] = useState();
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [followHovered, setFollowHovered] = useState(false);
  const [joinedAgo, setJoinedAgo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        // Fetch seller's profile information
        const sellerResponse = await axios.get(`http://localhost:3000/account/${id}`);
        setSeller(sellerResponse.data);

        // Fetch seller's products
        const productsResponse = await axios.get(`http://localhost:3000/product/user/${id}`);
        setProducts(productsResponse.data);

        // Fetch feedbacks for the seller
        const feedbacksResponse = await axios.get(`http://localhost:3000/feedback/evaluated/${id}`);
        setFeedbacks(feedbacksResponse.data);

        // Calculate joined ago
        const joinedDate = moment(sellerResponse.data.createdAt);
        const now = moment();
        const ago = moment.duration(now.diff(joinedDate));
        setJoinedAgo(ago.humanize(true));
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchSellerData();
  }, [id]);

  const handleFeedbackSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/feedback`, {
        evaluator: user.id,
        evaluated: id,
        comment: newFeedback,
        rating,
      });
      setFeedbacks([...feedbacks, response.data]);
      setNewFeedback('');
      setRating(0);
    } catch (error) {
      console.log('Error submitting feedback:', error);
    }
  };

  const handleReportSeller = () => {
    // Handle reporting seller 
  };

  const handleFollowSeller = () => {
    // Handle follow seller 
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  if (!seller) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap p-6 space-y-6 md:space-y-0 md:space-x-6">
      <div className="w-1/4 md:w-1/4 relative">
        <Card
          className="mb-4"
          cover={<Avatar className="mx-auto my-4" size={128} src={seller.avatar} alt={seller.username} />}
        >
          <Title level={2} className="text-center">{seller.username}</Title>
          {/* <div className="w-full h-full bg-blue text-center">
            <Button
              type="text"
              icon={<PlusOutlined />}
              style={{ backgroundColor: '#2FE1E2', color: '#ffffff' }}
              onClick={handleFollowSeller}
              onMouseEnter={() => setFollowHovered(true)}
              onMouseLeave={() => setFollowHovered(false)}
              className={followHovered ? 'animate-bounce' : ''}
            >
              Follow
            </Button>
          </div> */}
          <Paragraph>Email: {seller.email}</Paragraph>
          <Paragraph>Phone: {seller.phone}</Paragraph>
          <Paragraph>Joined: {joinedAgo} ago</Paragraph>
          <div className="text-red absolute top-0 right-0 mt-2 mr-2">
            <Tooltip title="Report">
              <Button
                type="text"
                icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                onClick={handleReportSeller}
              />
            </Tooltip>
          </div>
        </Card>
      </div>
      
      <div className="w-3/5 md:w-3/5 space-y-6">
        <Card className="mb-4" title="Products">
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={products.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            renderItem={product => (
              <List.Item key={product.id}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.image} className="w-full h-48 object-cover" />}
                  onClick={() => (window.location.href = `/product/${product.id}`)}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <div>
                        <span style={{ fontWeight: 'bold', color: 'red' }}>{`$ ${product.price}`}</span> - {moment(product.createdAt).fromNow()}
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            onChange={onPageChange}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        </Card>

        <Card title="Give Feedback">
          <div className="space-y-4">
            <Rate value={rating} onChange={setRating} />
            <div className="flex">
              <Avatar size={32} src={user.avatar} />
              <TextArea
                rows={4}
                value={newFeedback}
                onChange={e => setNewFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                style={{ marginLeft: '10px', width: 'calc(100% - 42px)' }}
              />
            </div>
            <Button type="primary" onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </div>
        </Card>

        <Card title="Previous Feedbacks">
          <List
            itemLayout="horizontal"
            dataSource={feedbacks}
            renderItem={feedback => (
              <List.Item key={feedback.id}>
                <List.Item.Meta
                  avatar={<Avatar src={feedback.evaluator.avatar} />}
                  title={feedback.evaluator.username}
                  description={feedback.comment}
                />
                <div>Rating: <Rate disabled value={feedback.rating} /></div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default ViewSellerProfile;
