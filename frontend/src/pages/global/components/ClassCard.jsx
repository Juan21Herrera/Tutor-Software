export default function ClassCard({ classItem }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">{classItem.title}</h2>
            <p className="text-gray-600 mb-4">{classItem.description}</p>
            {classItem.content_url && (
                <a
                    href="{classItem.content_url}"
                    className="text-sm text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ver contenido de la clase
                </a>
            )}
            <p className="text-xs text-gray-400 mt-4">Publicado: {new Date(classItem.created_at).toLocaleDateString()}</p>
        </div>
    )
}