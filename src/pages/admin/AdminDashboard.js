import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../utils/api";
import RichTextEditor from "./RichTextEditor";

const emptyForm = {
    title: "",
    content: {
        en: "",
        hi: "",
        ta: ""
    },
    video: "",
    images: []
};

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [editingId, setEditingId] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(emptyForm);

    const imageInputRef = useRef(null);

    // ==========================================
    // FETCH MODULES
    // ==========================================

    const loadModules = async () => {
        try {
            const res = await API.get("/modules");

            setModules(
                Array.isArray(res.data)
                    ? res.data
                    : []
            );
        } catch (err) {
            console.error(
                "LOAD MODULES ERROR:",
                err
            );
        }
    };

    useEffect(() => {
        loadModules();
    }, []);


    // ==========================================
    // FORM HANDLERS
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleContentChange = (language, value) => {
        setForm((prev) => ({
            ...prev,
            content: {
                ...prev.content,
                [language]: value
            }
        }));
    };


    // ==========================================
    // IMAGE HANDLERS
    // ==========================================

    const handleImageSelect = (e) => {
        const selectedFiles = Array.from(
            e.target.files || []
        );

        if (selectedFiles.length === 0) {
            return;
        }

        const remainingSlots =
            5 - form.images.length;

        if (remainingSlots <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Maximum 5 images",
                text: "You can add a maximum of 5 images to a module."
            });

            e.target.value = "";

            return;
        }

        const filesToAdd =
            selectedFiles.slice(
                0,
                remainingSlots
            );

        if (
            selectedFiles.length >
            remainingSlots
        ) {
            Swal.fire({
                icon: "warning",
                title: "Only 5 images allowed",
                text: `Only ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"
                    } can be added.`
            });
        }

        const newImages =
            filesToAdd.map((file) => ({
                file,
                preview:
                    URL.createObjectURL(file)
            }));

        setForm((prev) => ({
            ...prev,
            images: [
                ...prev.images,
                ...newImages
            ]
        }));

        e.target.value = "";
    };


    const removeImage = (index) => {
        setForm((prev) => {
            const imageToRemove =
                prev.images[index];

            if (
                imageToRemove &&
                imageToRemove.preview &&
                imageToRemove.file
            ) {
                URL.revokeObjectURL(
                    imageToRemove.preview
                );
            }

            return {
                ...prev,

                images: prev.images.filter(
                    (_, imageIndex) =>
                        imageIndex !== index
                )
            };
        });
    };


    // ==========================================
    // UPLOAD IMAGES
    // ==========================================

    const uploadImages = async () => {
        if (form.images.length === 0) {
            return [];
        }

        const uploadedUrls = [];

        for (const image of form.images) {

            // ==========================================
            // EXISTING IMAGE
            // ==========================================

            if (!image.file) {

                if (image.url) {
                    uploadedUrls.push(
                        image.url
                    );
                }

                continue;
            }


            // ==========================================
            // NEW IMAGE
            // ==========================================

            const formData = new FormData();

            formData.append(
                "image",
                image.file
            );

            const response = await API.post(
                "/uploads/image",
                formData
            );

            console.log(
                "IMAGE UPLOAD RESPONSE:",
                response.data
            );

            const uploadedUrl =
                response.data?.url;

            if (!uploadedUrl) {
                throw new Error(
                    "Image uploaded but backend did not return an image URL."
                );
            }

            uploadedUrls.push(
                uploadedUrl
            );
        }

        console.log(
            "FINAL IMAGE URLS:",
            uploadedUrls
        );

        return uploadedUrls;
    };


    // ==========================================
    // RESET FORM
    // ==========================================

    const resetForm = () => {

        form.images.forEach((image) => {

            if (
                image.file &&
                image.preview
            ) {
                URL.revokeObjectURL(
                    image.preview
                );
            }

        });

        setForm({
            title: "",
            content: {
                en: "",
                hi: "",
                ta: ""
            },
            video: "",
            images: []
        });

        setEditingId(null);

        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    };


    // ==========================================
    // CREATE / UPDATE MODULE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Title required",
                text: "Please enter a module title."
            });

            return;
        }

        try {

            setLoading(true);


            // ==========================================
            // UPLOAD IMAGES
            // ==========================================

            const imageUrls =
                await uploadImages();


            // ==========================================
            // MODULE DATA
            // ==========================================

            const moduleData = {
                title: form.title,

                content: form.content,

                video: form.video,

                images: imageUrls
            };


            console.log(
                "MODULE DATA:",
                moduleData
            );


            // ==========================================
            // UPDATE
            // ==========================================

            if (editingId) {

                await API.put(
                    `/admin/module/${editingId}`,
                    moduleData
                );

            }

            // ==========================================
            // CREATE
            // ==========================================

            else {

                await API.post(
                    "/admin/module",
                    moduleData
                );

            }


            // ==========================================
            // SUCCESS
            // ==========================================

            Swal.fire({
                icon: "success",

                title: editingId
                    ? "Module Updated"
                    : "Module Created",

                text: editingId
                    ? "The module has been updated successfully."
                    : "The new module has been created successfully.",

                timer: 1800,

                showConfirmButton: false
            });


            resetForm();

            await loadModules();

        } catch (err) {

            console.error(
                "SAVE MODULE ERROR:",
                err
            );

            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text:
                    err?.message ||
                    "Unable to save the module."
            });

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // EDIT MODULE
    // ==========================================

    const handleEdit = (module) => {

        setEditingId(
            module._id
        );


        // ==========================================
        // SUPPORT BOTH NEW AND OLD DATA
        // ==========================================

        let existingImages = [];


        if (
            Array.isArray(module.images)
        ) {

            existingImages =
                module.images;

        }

        else if (
            Array.isArray(module.image)
        ) {

            existingImages =
                module.image;

        }

        else if (
            module.image
        ) {

            existingImages = [
                module.image
            ];

        }


        // Remove empty URLs

        existingImages =
            existingImages
                .filter(Boolean)
                .slice(0, 5);


        setForm({

            title:
                module.title || "",

            content: {

                en:
                    module.content?.en ||
                    "",

                hi:
                    module.content?.hi ||
                    "",

                ta:
                    module.content?.ta ||
                    ""

            },

            video:
                module.video || "",

            images:
                existingImages.map(
                    (url) => ({
                        url,
                        preview: url
                    })
                )

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // DELETE MODULE
    // ==========================================

    const handleDelete = async (id) => {

        const result =
            await Swal.fire({

                icon: "warning",

                title: "Delete module?",

                text:
                    "This action cannot be undone.",

                showCancelButton: true,

                confirmButtonText:
                    "Yes, delete",

                cancelButtonText:
                    "Cancel",

                confirmButtonColor:
                    "#d9468f"
            });


        if (
            !result.isConfirmed
        ) {
            return;
        }


        try {

            await API.delete(
                `/admin/module/${id}`
            );


            Swal.fire({

                icon: "success",

                title: "Deleted",

                text:
                    "Module deleted successfully.",

                timer: 1500,

                showConfirmButton: false

            });


            await loadModules();

        } catch (err) {

            console.error(
                "DELETE MODULE ERROR:",
                err
            );


            Swal.fire({

                icon: "error",

                title: "Delete failed",

                text:
                    "Unable to delete the module."

            });

        }
    };


    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="admin-dashboard">


            {/* ==========================================
                PAGE HEADER
            ========================================== */}

            <div className="admin-page-header">

                <div>

                    <span className="admin-section-label">
                        CONTENT MANAGEMENT
                    </span>

                    <h1>
                        Module Management
                    </h1>

                    <p>
                        Create, edit and manage Prenova learning modules.
                    </p>

                </div>


                <div className="admin-module-count">

                    <span>
                        {modules.length}
                    </span>

                    <small>
                        {modules.length === 1
                            ? "Module"
                            : "Modules"}
                    </small>

                </div>

            </div>


            {/* ==========================================
                MODULE FORM
            ========================================== */}

            <section className="admin-form-card">

                <div className="admin-card-header">

                    <div className="admin-card-icon">

                        {editingId
                            ? "✎"
                            : "+"}

                    </div>


                    <div>

                        <span className="admin-section-label">

                            {editingId
                                ? "EDIT MODULE"
                                : "CREATE MODULE"}

                        </span>


                        <h2>

                            {editingId
                                ? "Update Learning Module"
                                : "Add New Module"}

                        </h2>

                    </div>

                </div>


                <form
                    onSubmit={handleSubmit}
                >


                    {/* ==========================================
                        MODULE TITLE
                    ========================================== */}

                    <div className="admin-form-group">

                        <label>
                            Module Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter module title"
                            value={form.title}
                            onChange={handleChange}
                        />

                    </div>


                    {/* ==========================================
                        MODULE IMAGES
                    ========================================== */}

                    <div className="admin-form-group">

                        <label>

                            Module Images

                            <span>
                                Optional • Maximum 5
                            </span>

                        </label>


                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            multiple
                            onChange={handleImageSelect}
                            style={{
                                display: "none"
                            }}
                        />


                        <button
                            type="button"

                            onClick={() =>
                                imageInputRef.current?.click()
                            }

                            disabled={
                                form.images.length >= 5
                            }

                            style={{

                                padding:
                                    "10px 18px",

                                border:
                                    "1px solid #d9468f",

                                borderRadius:
                                    "8px",

                                background:
                                    "white",

                                color:
                                    "#d9468f",

                                cursor:
                                    form.images.length >= 5
                                        ? "not-allowed"
                                        : "pointer",

                                fontWeight:
                                    "600",

                                marginBottom:
                                    "14px",

                                opacity:
                                    form.images.length >= 5
                                        ? 0.5
                                        : 1
                            }}
                        >

                            + Add Images

                        </button>


                        {/* ==========================================
                            IMAGE PREVIEWS
                        ========================================== */}

                        {form.images.length > 0 && (

                            <div
                                style={{

                                    display:
                                        "flex",

                                    flexWrap:
                                        "wrap",

                                    gap:
                                        "12px",

                                    marginTop:
                                        "5px"

                                }}
                            >

                                {form.images.map(
                                    (
                                        image,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                index
                                            }

                                            style={{

                                                position:
                                                    "relative",

                                                width:
                                                    "120px",

                                                height:
                                                    "85px",

                                                borderRadius:
                                                    "10px",

                                                overflow:
                                                    "hidden",

                                                border:
                                                    "1px solid #ddd",

                                                background:
                                                    "#f8f8f8"

                                            }}
                                        >

                                            <img

                                                src={
                                                    image.preview ||
                                                    image.url
                                                }

                                                alt={`Module preview ${index + 1}`}

                                                style={{

                                                    width:
                                                        "100%",

                                                    height:
                                                        "100%",

                                                    objectFit:
                                                        "cover",

                                                    display:
                                                        "block"

                                                }}

                                            />


                                            <button

                                                type="button"

                                                onClick={() =>
                                                    removeImage(
                                                        index
                                                    )
                                                }

                                                style={{

                                                    position:
                                                        "absolute",

                                                    top:
                                                        "5px",

                                                    right:
                                                        "5px",

                                                    width:
                                                        "24px",

                                                    height:
                                                        "24px",

                                                    border:
                                                        "none",

                                                    borderRadius:
                                                        "50%",

                                                    background:
                                                        "rgba(0,0,0,0.7)",

                                                    color:
                                                        "white",

                                                    cursor:
                                                        "pointer",

                                                    fontSize:
                                                        "16px",

                                                    lineHeight:
                                                        "24px",

                                                    padding:
                                                        0

                                                }}

                                                title="Remove image"

                                            >

                                                ×

                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        )}


                        <small
                            style={{

                                display:
                                    "block",

                                marginTop:
                                    "10px",

                                color:
                                    "#777"

                            }}
                        >

                            These images are common to all languages
                            and will appear above the learning content.

                        </small>

                    </div>


                    {/* ==========================================
                        ENGLISH
                    ========================================== */}

                    <div className="admin-form-group">

                        <label>

                            English Content

                            <span>
                                English
                            </span>

                        </label>


                        <RichTextEditor

                            value={
                                form.content.en
                            }

                            onChange={(value) =>
                                handleContentChange(
                                    "en",
                                    value
                                )
                            }

                            placeholder="Enter English learning content..."

                        />

                    </div>


                    {/* ==========================================
                        HINDI
                    ========================================== */}

                    <div className="admin-form-group">

                        <label>

                            Hindi Content

                            <span>
                                हिंदी
                            </span>

                        </label>


                        <RichTextEditor

                            value={
                                form.content.hi
                            }

                            onChange={(value) =>
                                handleContentChange(
                                    "hi",
                                    value
                                )
                            }

                            placeholder="हिंदी learning content दर्ज करें..."

                        />

                    </div>


                    {/* ==========================================
                        TAMIL
                    ========================================== */}

                    <div className="admin-form-group">

                        <label>

                            Tamil Content

                            <span>
                                தமிழ்
                            </span>

                        </label>


                        <RichTextEditor

                            value={
                                form.content.ta
                            }

                            onChange={(value) =>
                                handleContentChange(
                                    "ta",
                                    value
                                )
                            }

                            placeholder="தமிழ் learning content உள்ளிடவும்..."

                        />

                    </div>


                    {/* ==========================================
                        VIDEO
                    ========================================== */}

                    <div className="admin-form-group">

                        <label>

                            Video URL

                            <span>
                                Optional
                            </span>

                        </label>


                        <div className="admin-video-input">

                            <span>
                                ▶
                            </span>


                            <input

                                type="url"

                                name="video"

                                placeholder="https://www.youtube.com/..."

                                value={
                                    form.video
                                }

                                onChange={
                                    handleChange
                                }

                            />

                        </div>

                    </div>


                    {/* ==========================================
                        ACTIONS
                    ========================================== */}

                    <div className="admin-form-actions">

                        <button

                            type="submit"

                            className="admin-primary-button"

                            disabled={
                                loading
                            }

                        >

                            {loading

                                ? "Saving..."

                                : editingId
                                    ? "Update Module →"
                                    : "Create Module →"

                            }

                        </button>


                        {editingId && (

                            <button

                                type="button"

                                className="admin-secondary-button"

                                onClick={
                                    resetForm
                                }

                            >

                                Cancel

                            </button>

                        )}

                    </div>

                </form>

            </section>


            {/* ==========================================
                MODULE LIST
            ========================================== */}

            <section className="admin-modules-section">

                <div className="admin-list-header">

                    <div>

                        <span className="admin-section-label">
                            EXISTING CONTENT
                        </span>

                        <h2>
                            Learning Modules
                        </h2>

                    </div>


                    <span className="admin-list-count">

                        {modules.length}
                        {" "}
                        total

                    </span>

                </div>


                {modules.length === 0 ? (

                    <div className="admin-empty-state">

                        <div>
                            📚
                        </div>

                        <h3>
                            No modules yet
                        </h3>

                        <p>
                            Create your first learning module
                            using the form above.
                        </p>

                    </div>

                ) : (

                    <div className="admin-module-grid">

                        {modules.map(
                            (
                                module,
                                index
                            ) => (

                                <article

                                    className="admin-module-card"

                                    key={
                                        module._id
                                    }

                                >

                                    <div className="admin-module-card-top">

                                        <div className="admin-module-number">

                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}

                                        </div>


                                        <div className="admin-module-actions">

                                            <button

                                                type="button"

                                                onClick={() =>
                                                    handleEdit(
                                                        module
                                                    )
                                                }

                                                title="Edit module"

                                            >
                                                ✎
                                            </button>


                                            <button

                                                type="button"

                                                onClick={() =>
                                                    handleDelete(
                                                        module._id
                                                    )
                                                }

                                                title="Delete module"

                                            >
                                                ×
                                            </button>

                                        </div>

                                    </div>


                                    <div className="admin-module-card-content">

                                        <span className="admin-module-status">
                                            LEARNING MODULE
                                        </span>


                                        <h3>
                                            {module.title}
                                        </h3>


                                        <p>

                                            {module.content?.en

                                                ? module.content.en.substring(
                                                    0,
                                                    150
                                                ) +
                                                (
                                                    module.content.en.length >
                                                        150
                                                        ? "..."
                                                        : ""
                                                )

                                                : "No English content available."

                                            }

                                        </p>

                                    </div>


                                    <div className="admin-module-card-footer">

                                        <div className="admin-module-info">

                                            <span>
                                                🌐
                                            </span>

                                            3 Languages

                                        </div>


                                        {module.video && (

                                            <div className="admin-module-info">

                                                <span>
                                                    ▶
                                                </span>

                                                Video

                                            </div>

                                        )}

                                    </div>


                                    <button

                                        type="button"

                                        className="admin-quiz-button"

                                        onClick={() =>
                                            navigate(
                                                `/admin/quiz/${module._id}`
                                            )
                                        }

                                    >

                                        Manage Quiz

                                        <span>
                                            →
                                        </span>

                                    </button>

                                </article>

                            )
                        )}

                    </div>

                )}

            </section>

        </div>
    );
}