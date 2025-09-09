import { useState } from 'react'
import styled from 'styled-components'
import './App.css'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`

const CreatorSection = styled.div`
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  margin: 1rem 0;
`

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 2rem;
`

const ImageCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const ImageText = styled.p`
  padding: 15px;
  margin: 0;
  font-size: 14px;
  color: #666;
`

function App() {
  const [prompt, setPrompt] = useState('')
  const [mangaPanels, setMangaPanels] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generateManga = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    
    // 시뮬레이션된 AI 응답 (실제로는 AI API 호출)
    setTimeout(() => {
      const newPanel = {
        id: Date.now(),
        prompt: prompt,
        imageUrl: `https://picsum.photos/400/300?random=${Date.now()}`,
        description: `AI가 생성한 만화 패널: ${prompt}`
      }
      
      setMangaPanels(prev => [...prev, newPanel])
      setPrompt('')
      setIsLoading(false)
    }, 2000)
  }

  const clearPanels = () => {
    setMangaPanels([])
  }

  return (
    <Container>
      <Title>🎨 AI 만화 생성기</Title>
      
      <CreatorSection>
        <h2>만화 장면을 설명해주세요</h2>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="예: 용감한 히어로가 거대한 로봇과 도시에서 싸우는 장면"
        />
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button 
            onClick={generateManga} 
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? '생성 중...' : '만화 생성'}
          </Button>
          
          {mangaPanels.length > 0 && (
            <Button 
              onClick={clearPanels}
              style={{ background: '#dc3545' }}
            >
              모두 지우기
            </Button>
          )}
        </div>
      </CreatorSection>

      {mangaPanels.length > 0 && (
        <div>
          <h2>생성된 만화 패널들</h2>
          <ImageGrid>
            {mangaPanels.map((panel) => (
              <ImageCard key={panel.id}>
                <Image src={panel.imageUrl} alt={panel.description} />
                <ImageText>{panel.prompt}</ImageText>
              </ImageCard>
            ))}
          </ImageGrid>
        </div>
      )}
      
      {mangaPanels.length === 0 && (
        <div style={{ marginTop: '3rem', color: '#888' }}>
          <p>아직 생성된 만화가 없습니다. 위에서 장면을 설명하고 생성 버튼을 눌러보세요!</p>
        </div>
      )}
    </Container>
  )
}

export default App