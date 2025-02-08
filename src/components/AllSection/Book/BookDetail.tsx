import { Card, Typography, Descriptions, Image } from "antd";

const { Title, Text } = Typography;

interface Book {
  _id: string;
  name: string;
  author: string;
  coverImage: string;
  description: string;
  price: number;
  language: string;
  publishedAt: string;
}

const BookDetail: React.FC<{ item: Book }> = ({ item }) => {
  return (
    <Card className="max-w-xl mx-auto shadow-lg rounded-xl overflow-hidden p-6">
      <Image
        src={item.coverImage}
        alt={item.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <Title level={3} className="text-gray-800 text-center">
        {item.name}
      </Title>
      <Text className="text-gray-600 block text-lg text-center">
        By {item.author}
      </Text>
      <Text className="block text-gray-500 mt-2 italic text-center">
        Published: {new Date(item.publishedAt).toLocaleDateString()}
      </Text>
      <Descriptions bordered column={1} className="mt-6">
        <Descriptions.Item label="Description">
          {item.description}
        </Descriptions.Item>
        <Descriptions.Item label="Price">${item.price}</Descriptions.Item>
        <Descriptions.Item label="Language">{item.language}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BookDetail;
