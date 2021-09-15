import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: "dmqdeq1tw",
  api_key: "669587385956189",
  api_secret: "n7Ec9ZtTdo5wp9JwxhlWZjjY7ZI",
  secure: true,
});

describe("fileUpload tests", () => {
  test("must upload the file and return the url", async () => {
    const resp = await fetch("https://static.dw.com/image/45807139_303.jpg");
    const blob = await resp.blob();

    const file = new File([blob], "foto.jpg");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    const segment = url.split("/");
    const imageId = segment[segment.length - 1].replace(".jpg", "");

    cloudinary.v2.api.delete_resources(imageId, {}, () => {});
  });
  test("must return an error", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
