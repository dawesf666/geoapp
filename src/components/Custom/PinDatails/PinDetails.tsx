import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export default function FenixCard() {
  return (
    <Card className="bg-black text-white rounded-2xl shadow-lg p-6 w-full max-w-3xl">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Fenix</h2>
          <Badge className="bg-white text-black">In costruzione</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Comune</p>
            <p className="text-muted-foreground">Centuripe, Paternò, Belpasso</p>
          </div>
          <div>
            <p className="font-semibold">Proprietario</p>
            <p className="text-muted-foreground">Ibedrola</p>
          </div>

          <div>
            <p className="font-semibold">Costruttore</p>
            <p className="text-muted-foreground">IBVI 1 SRL</p>
          </div>
          <div>
            <p className="font-semibold">Potenza installata</p>
            <p className="text-muted-foreground">300MW</p>
          </div>

          <div>
            <p className="font-semibold">Estensione</p>
            <p className="text-muted-foreground">500 ha circa</p>
          </div>
          <div>
            <p className="font-semibold">Descrizione ecologica dei siti</p>
            <p className="text-muted-foreground">Vedi relazione agronomica</p>
          </div>

          <div>
            <p className="font-semibold">Autorizzazioni</p>
            <Button variant="link" className="text-white px-0" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Link a documenti <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div>
            <p className="font-semibold">Foto/video</p>
            <Button variant="link" className="text-white px-0" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Link multimediali <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
