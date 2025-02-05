import { useEffect, useState } from "react";
import { Form, Image, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload";
import { RcFile } from "antd/es/upload/interface";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface FileUploaderProps {
  name: string;
  label: string;
  required?: boolean;
  multiple?: boolean;
  defaultValue?: UploadFile[];
  small?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  name,
  label,
  required = false,
  multiple = false,
  defaultValue = [],
  small = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (defaultValue.length > 0) {
      setShowUploader(true);
      setFileList(defaultValue);
    }
  }, [defaultValue]);

  const handleRemove = () => {
    setFileList([]);
    setShowUploader(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleFileChange: UploadProps["onChange"] = (info) => {
    let newFileList = [...info.fileList];

    newFileList = newFileList.slice(-1); // Keep only the latest file

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const normFile = (e: any) => {
    return Array.isArray(e) ? e : e?.fileList;
  };

  return (
    <>
      {previewImage && (
        <Image
          alt="Preview"
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Form.Item
        label={label}
        name={name}
        rules={[{ required, message: `${label} is required` }]}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload.Dragger
          listType="picture-card"
          name="file"
          style={{
            display: fileList.length > 0 || showUploader ? "none" : "block",
          }}
          className="group"
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={(file) => {
            setFileList([file]);
            return false;
          }}
          onRemove={handleRemove}
          onPreview={handlePreview}
          multiple={multiple}
          maxCount={multiple ? 20 : 2}
        >
          {(fileList.length < 1 || multiple) && (
            <button
              style={{ border: 0, background: "none" }}
              type="button"
              className="w-full flex flex-col items-center justify-center group-hover:text-primary duration-500"
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              {!small && (
                <>
                  <p className="ant-upload-text">
                    Click or drag file to upload
                  </p>
                </>
              )}
            </button>
          )}
        </Upload.Dragger>
      </Form.Item>
    </>
  );
};

export default FileUploader;
