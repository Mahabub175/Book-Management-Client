import CustomDatePicker from "@/components/Reusable/Form/CustomDatePicker";
import CustomInput from "@/components/Reusable/Form/CustomInput";
import CustomTextEditor from "@/components/Reusable/Form/CustomTextEditor";
import FileUploader from "@/components/Reusable/Form/FileUploader";

const BookForm = ({ attachment }: { attachment?: string }) => {
  return (
    <>
      <CustomInput label={"Book Title"} name={"name"} required={true} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CustomInput label={"Book Author"} name={"author"} required={true} />
        <CustomInput
          label={"Book Price"}
          name={"price"}
          type="number"
          required={true}
        />
        <CustomInput
          label={"Book Language"}
          name={"language"}
          required={true}
        />
        <CustomDatePicker
          label={"Book Publishing Date"}
          name={"publishedAt"}
          required={true}
        />
      </div>
      <CustomTextEditor
        label={"Book Description"}
        name={"description"}
        required={true}
      />
      <FileUploader
        defaultValue={attachment}
        label="Book Cover Image"
        name="coverImage"
        required={true}
      />
    </>
  );
};

export default BookForm;
