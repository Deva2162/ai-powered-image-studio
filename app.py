from flask import Flask, request, render_template, send_file
from PIL import Image
import io
import base64  # Added for encoding images to display them inline
import os

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/remove_bg", methods=["POST"])
def remove_bg():
    try:
        file = request.files.get("image")
        if not file:
            return render_template("index.html", error="No image uploaded")

        response = requests.post(
            "https://api.remove.bg/v1.0/removebg",
            files={"image_file": file},
            data={"size": "auto"},
            headers={"X-Api-Key": "REMOVE_BG_KEY"},  # replace with your key
        )

        if response.status_code == 200:
            img_data = base64.b64encode(response.content).decode("utf-8")
            return render_template(
                "index.html",
                image_data=img_data,
                image_type="png",
                result_type="remove_bg"
            )
        else:
            return render_template("index.html", error="Background removal failed")

    except Exception as e:
        return render_template("index.html", error=str(e))
#@app.route("/remove_bg", methods=["POST"])
#def remove_bg():
 #   try:
  #      file = request.files.get("image")
   #     if not file:
    #        return render_template("index.html", error="No image uploaded")

     #   img = Image.open(file.stream).convert("RGBA")
      #  output = remove(img)

       # buf = io.BytesIO()
        #output.save(buf, format="PNG")
        #uf.seek(0)
        #
        # Encode image to base64 for inline display in HTML
        #img_data = base64.b64encode(buf.getvalue()).decode('utf-8')
        #return render_template("index.html", image_data=img_data, image_type="png", result_type="remove_bg")
    
    #except Exception as e:
     #   return render_template("index.html", error=str(e))

@app.route("/enhance_image", methods=["POST"])
def enhance_image():
    try:
        file = request.files.get("image")
        if not file:
            return render_template("index.html", error="No image uploaded")

        # Open the image
        img = Image.open(file.stream).convert("RGB")
        
        # Apply basic enhancements using PIL's ImageEnhance
        from PIL import ImageEnhance
        enhancer = ImageEnhance.Sharpness(img)
        img = enhancer.enhance(2.0)  # Increase sharpness
        
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(1.2)  # Increase brightness
        
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.3)  # Increase contrast
        
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.1)  # Boost color saturation
        
        # Save to buffer
        buf = io.BytesIO()
        img.save(buf, format="JPEG")
        buf.seek(0)
        
        # Encode image to base64 for inline display in HTML
        img_data = base64.b64encode(buf.getvalue()).decode('utf-8')
        return render_template("index.html", image_data=img_data, image_type="jpeg", result_type="enhance")
    
    except Exception as e:
        return render_template("index.html", error=str(e))

# Added route for the Contact Us page
@app.route("/contact")
def contact():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run()
# if __name__ == "__main__":





