export default function SectionHeading({
    label,
    title,
    description,
    rightContent = null,
    centered = false
}) {
    return (
        <div
            className={`section-heading ${centered ? "section-heading-centered" : ""
                }`}
        >

            <div className="section-heading-content">

                {label && (
                    <span className="section-label">
                        {label}
                    </span>
                )}

                {title && (
                    <h2>
                        {title}
                    </h2>
                )}

                {description && (
                    <p>
                        {description}
                    </p>
                )}

            </div>

            {rightContent && (
                <div className="section-heading-right">
                    {rightContent}
                </div>
            )}

        </div>
    );
}