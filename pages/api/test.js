
export default async (req, res) => {
    res.statusCode = 200
    const MODELS_URL = '/static/models'
    
    res.json({"hello": MODELS_URL})
}